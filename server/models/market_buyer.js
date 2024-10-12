const mongoose= require ('mongoose')

const Market_BSchema = mongoose.Schema({
    CompanyId:{type:String,required:true},
    name:{type:String, required:true},
    crop:{type:String,required:true},
    weight:{type:Number,required:true},
    cp:{type:Number,required:true},
    rate:{type:Number,required:true},
    description:{type:String,required:true}
})

const MarketB = mongoose.model('marketb',Market_BSchema)

module.exports=MarketB