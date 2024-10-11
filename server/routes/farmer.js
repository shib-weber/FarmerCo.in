const express = require('express');
const bodyParser = require('body-parser');
const Farmer = require('../models/farmer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

    const key = process.env.secret_key || 'hello';
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
        const key = process.env.secret_key || 'hello';
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
        const key = process.env.secret_key || 'hello';
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

module.exports = router;
