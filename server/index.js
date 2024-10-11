const express= require('express')
const Farmer_routes=require('./routes/farmer');
const mongoose= require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors=require('cors')
const app=express();
const PORT=4000
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true,               // Allow credentials (cookies)
  };

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors(corsOptions)); // Apply this before routes
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/farmer',Farmer_routes)

mongoose.connect('mongodb://127.0.0.1:27017/FarmerCo').then(res=>{console.log('MongoDb Connected')})

app.listen(PORT,()=>{
    console.log('Server is Live on PORT'+PORT)
})