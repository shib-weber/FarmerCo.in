const mongoose=require('mongoose')

const FarmerSchema = mongoose.Schema({
    name:{type:String,required:true,},
    password:{type:String,required:true},
    state:{type:String},
    local_p:{type:String},
    address:{type:String},
    pin:{type:Number,},
    contact:{type:Number},
    idp:{type:Number},
    land:{type:Number},
    mjc:{type:String}
})

const Farmer = mongoose.model('farmer',FarmerSchema)

module.exports=Farmer