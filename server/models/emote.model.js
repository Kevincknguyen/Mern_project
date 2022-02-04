const mongoose= require("mongoose")

const EmoteSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Name error: Name is required"],
        minlength:[4,"Name error: Name must be more than 3 characters"]
    },
    cost: {
        type:Number,
        required:[true,"Cost error: Cost is required"],
        minlength:[4,"Name error: Name must be more than 2 cahracters"]
    },
    image:{
        type:String,
        required:[true,"Image error: Image is required"]
    },
},{timestamps:true})


const Emote=mongoose.model('Emote',EmoteSchema)

module.exports=Emote
