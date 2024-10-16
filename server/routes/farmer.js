const express = require('express');
const bodyParser = require('body-parser');
const Farmer = require('../models/farmer');
const Company = require('../models/buyer')
const MarketF = require('../models/market_farmer')
const MarketB = require('../models/market_buyer')
const BuyerS = require('../models/buyer_send_offers')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true, // Allow cookies and credentials
};

const router = express.Router();
router.options('*', cors(corsOptions)); // Enable pre-flight across-the-board
router.use(cors(corsOptions)); // Apply CORS with options
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send("Welcome to Farmer's Portal");
});

// Token verification middleware
function TokenVerify(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.json('No'); // No token, user not authenticated
    }

    const key = process.env.secret_key || 'farmer';
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.json('No'); // Invalid token
        }
        req.user = decoded; // Valid token
        next(); // Proceed to the next middleware or route
    });
}

// Check token status
router.get('/istoken', TokenVerify, (req, res) => {
    return res.json('Yes'); // Token is valid
});

// Signup
router.post('/signup', async (req, res) => {
    const data = req.body;
    const response = await Farmer.create({
        name: data.Fname,
        password: data.Fpassword,
    });
    if (response) {
        const key = process.env.secret_key || 'farmer';
        const token = jwt.sign({ username: response.name, userid: response._id }, key, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({message:'Signup Successful'});
    }
});

// Login
router.post('/login', async (req, res) => {
    const data = req.body;
    const user = await Farmer.findOne({
        name: data.Fname,
        password: data.Fpassword,
    });
    if (!user) {
        return res.json({message:'Incorrect Name or Password'});
    } else {
        const key = process.env.secret_key || 'farmer';
        const token = jwt.sign({ username: user.name, userid: user._id }, key, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({message:'Login Successful',token});
    }
});

router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    res.json('loggedOut')
})

router.patch('/basicdetails', TokenVerify, async (req, res) => {
    try {
        const userId = req.user.userid; // Get the user's ID from the verified token
        const { updatedFormData } = req.body; // Get the updated form data

        // Update the farmer's details in the database
        const updatedFarmer = await Farmer.findByIdAndUpdate(userId, updatedFormData, {
            new: true, // Return the updated document
            runValidators: true, // Validate fields against the schema
        });

        // Check if the farmer was found and updated
        if (!updatedFarmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        return res.status(200).json({ message: 'Farmer details updated successfully', updatedFarmer });
    } catch (error) {
        console.error('Error updating farmer details:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.get('/checkdetails', TokenVerify,async(req,res)=>{
    const userId = req.user.userid; 
    const user = await Farmer.findOne({_id:userId})
    if(user.credentials === true){
        res.json('yes')
    }
    else{
        res.json('no')
    }
})

router.get('/fulldetails', TokenVerify,async(req,res)=>{
    const userId = req.user.userid; 
    const user = await Farmer.findOne({_id:userId})
    res.json(user)
})


router.get('/marketproduct', async (req, res) => {
    try {
        const products = await MarketB.find({});
        
        if (products.length > 0) {
            return res.json(products);
        } else {
            return res.status(200).json({ message: 'No products available in the market', products: [] });
        }
    } catch (error) {
        console.error("Error fetching market products:", error);
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
});

const mongourl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/FarmerCo' ;
const conn = mongoose.connection;

// Initialize GridFS
let gfs, gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads', // Same as GridFsStorage
    });
    
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Collection for files
    
    console.log('GridFS Initialized');
});
const storage = new GridFsStorage({
    url: mongourl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            if (!file.mimetype.startsWith('image/')) {
                return reject(new Error('Invalid file type'));
            }
            const filename = `${Date.now()}-${file.originalname}`;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads',
            };
            resolve(fileInfo);
        });
    },
});


const upload = multer({ storage });

/*process.on('uncaughtException',(err)=>{
    console.log('')
})*/

//Multer

router.post('/uploadPP', TokenVerify, (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Handle Multer-specific error
            console.error('Multer Error:', err);
            return res.status(500).json({ message: 'Multer error occurred during upload' });
        } else if (err) {
            // Handle any other unknown error
            console.error('Unknown Upload Error:', err);
            return res.status(400).json({ message: err.message });
        }

        try {
            // TokenVerify middleware attaches user data to req.user
            const farmerId = req.user?.userid;  // Added optional chaining to prevent undefined error
            if (!farmerId) {
                return res.status(401).json({ message: 'Unauthorized access' });
            }

            console.log('Farmer ID:', farmerId);

            // Log request body and file
            console.log('Request Body:', req.body);
            console.log('Uploaded File:', req.file);

            // Check if a file was uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const filename = req.file.filename;
            const url = `/uploads/${filename}`; // Adjust based on your file serving setup
            console.log('File URL:', url);

            // Update farmer's profile picture in the database
            const farmer = await Farmer.findByIdAndUpdate(
                farmerId,
                { profilepic: url }, // Updating the profile picture URL
                {
                    new: true,         // Return the updated document
                    runValidators: true // Enforce schema validation
                }
            );

            if (!farmer) {
                return res.status(404).json({ message: 'Farmer not found' });
            }

            console.log('Profile updated successfully');
            return res.status(200).json({ message: 'Image uploaded and profile updated successfully', url });

        } catch (error) {
            // Catch and log any errors that occur during database operations
            console.error('Error in /uploadPP route:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });
});

// Route to get files
router.get('/uploads/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'No file exists' });
        }

        // Check if the file is an image
        if (file.contentType.startsWith('image/')) {
            // Create a read stream and pipe it to the response
            const readstream = gridfsBucket.openDownloadStreamByName(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ message: 'Not an image' });
        }
    });
});

//Marketing

router.post('/market',TokenVerify,async(req,res)=>{
    const {crop,weight,sp,rate,description} = req.body
    const FarmerId=req.user.userid
    const name=req.user.username
    const response = await MarketF.create({
        FarmerId,
        name,
        crop,
        weight,
        sp,
        rate,
        description
    })
    if(response){
        
        res.json('Added To Market')
    }
    
})


router.get('/getitems', TokenVerify,async (req, res) => {
    try {
        const itemlist = await MarketF.find({});
        const items = itemlist
            .filter(item => (item.FarmerId === req.user.userid && item.sold === false))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (items.length > 0) {
            res.status(200).json(items);  // Return the array of items
        } else {
            res.status(200).json([]);  // Return an empty array if no items found
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
});

router.delete('/deleteitem/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      
      const deletedItem = await MarketF.findByIdAndDelete(itemId);
  
      if (deletedItem) {
        res.status(200).json('deleted');
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item', error });
    }
  });


  router.get('/companies',async(req,res)=>{
    const companies = await Company.find({})
    if(companies.length > 0){
        return res.json(companies)
    }else{
        return res.json([])
    }
})


router.get('/solditems',TokenVerify,async(req,res)=>{
    try {
        const itemlist = await MarketF.find({});
        const items = itemlist.filter(item => ((item.FarmerId === req.user.userid) && (item.sold === true)));
        if (items.length > 0) {
            res.status(200).json(items);  // Return the array of items
        } else {
            res.status(200).json([]);  // Return an empty array if no items found
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
})

router.get('/viewOffers/:id',TokenVerify,async(req,res)=>{
    const response = await BuyerS.find({})
    const offers = await response.filter(offer => offer.offerId === req.params.id)
    if(offers.length > 0){
        return res.json(offers)
    }else{
        return res.json([])
    }
})

router.patch('/updatesold', TokenVerify, async (req, res) => {
    try {
        const {Id, offerId,Cid } = req.body; // Extract offerId from request body

        // Update the farmer's product details in the database by setting 'sold' to true
        const updatedProduct = await MarketF.findByIdAndUpdate(offerId, { sold: true, buyerId:Cid }, {
            new: true, // Return the updated document
            runValidators: true, // Validate fields against the schema
        });
        const updatedProduct2 = await BuyerS.findByIdAndUpdate(Id, { accept: true, }, {
            new: true, // Return the updated document
            runValidators: true, // Validate fields against the schema
        });

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'done', updatedProduct });
    } catch (error) {
        console.error('Error updating product details:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.get('/offerc/:id', TokenVerify, async (req, res) => {
    try {
        const offerId = req.params.id;

        // Find the offer based on the correct field names in your schema
        const offer = await BuyerS.findOne({ offerId: offerId, accept:true });

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        return res.json(offer);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
