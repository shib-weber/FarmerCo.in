const mongoose = require('mongoose')

const Buyer_SendSchema=mongoose.Schema({
    offerId:{type:String,required:true},
    Cname:{type:String,required:true},
    Cid:{type:String,required:true},
    price:{type:Number,required:true},
    accept:{type:Boolean,default:false}
})

const BuyerOffer = mongoose.model('buyerso',Buyer_SendSchema)

module.exports = BuyerOffer