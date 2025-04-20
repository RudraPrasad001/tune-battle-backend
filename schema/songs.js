const mongoose=require("mongoose");
const songSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the song"]
    },
    artist:{
        type:String,
        required:[true,"Please provide the artist"]
    },
    spotify_url:{
        type:String,
        required:[true,"Please provide a valid  link"]
    },
    sessionId: String,
},
{
    timestamps:true,
}
);
module.exports=mongoose.model("Song",songSchema);