const express=require('express')
const bodyParser=require('body-parser')

const router=express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',(req,res)=>{
    res.send("Welcome to Farmer's Portal")
})

module.exports=router