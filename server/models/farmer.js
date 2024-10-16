const mongoose=require('mongoose')

const FarmerSchema = mongoose.Schema({
    profilepic:{type:String,default:"/farmer.webp"},
    name:{type:String,required:true,},
    password:{type:String,required:true},
    credentials:{type:Boolean,default:false},
    state:{type:String},
    localP:{type:String},
    address:{type:String},
    pin:{type:Number,},
    phone:{type:Number},
    idp:{type:Number},
    land:{type:Number},
    mjc:{type:String},
    createdAt: { type: Date, default: Date.now },
})

const Farmer = mongoose.model('farmer',FarmerSchema)

module.exports=Farmer