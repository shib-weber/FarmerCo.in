const mongoose= require('mongoose')

const BuyerSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    state:{type:String},
    address:{type:String},
    pin:{type:Number},
    phone:{type:Number},
    yto:{type:Number},
    mjc:{type:String},
    credentials:{type:Boolean,default:false}
})

const Buyer = mongoose.model('buyer',BuyerSchema)

module.exports=Buyer