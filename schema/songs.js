const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the song"]
    },
    artist:{
        type:String,
        required:[true,"Please provide the artist"]
    }
},
{
    timestamps:true,
}
);
module.exports=mongoose.model("Contact",contactSchema);