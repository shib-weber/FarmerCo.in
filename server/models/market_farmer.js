const mongoose= require ('mongoose')

const Market_FSchema = mongoose.Schema({
    FarmerId:{type:String,required:true},
    name:{type:String, required:true},
    crop:{type:String,required:true},
    weight:{type:Number,required:true},
    sp:{type:Number,required:true},
    rate:{type:Number,required:true},
    description:{type:String,required:true},
    sold:{type:Boolean,default:false},
    buyerId:{type:String},
    createdAt: { type: Date, default: Date.now },
})

const MarketF = mongoose.model('marketf',Market_FSchema)

module.exports=MarketF