const express= require('express')
const Farmer_routes=require('./routes/farmer');
const bodyParser = require('body-parser');
const app=express();
const PORT=4000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/farmer',Farmer_routes)


app.listen(PORT,()=>{
    console.log('Server is Live on PORT'+PORT)
})