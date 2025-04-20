const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Song = require('../schema/songs');
const connectDb =require('../dbConnection/connect.js');
let count = 0;
let sessionIdd = '';
const createSong = async (tracks,sessionId) => {
    try {
        console.log("Received in createSong:");
        sessionIdd=sessionId;
        await Song.deleteMany({sessionId:sessionId});

        if (!Array.isArray(tracks) ) {
            console.error("Error: createSong received invalid data.");
            return [];
        }

        const savedSongs = await Song.insertMany(tracks);
        return savedSongs;
    } catch (error) {
        console.error("Error saving songs:", error);
        throw error;
    }
};
const deleteSong = asyncHandler(async (req, res) => {
    const songToDelete = await Song.findById(req.params.id);
    if (!songToDelete) {
        return res.status(404).json({ message: "Song not found" });
    }

    const totalSongs = await Song.countDocuments({sessionId:sessionIdd});
    if (totalSongs === 1) {
        return res.status(400).json({ message: "Cannot delete the last song" });
    }

    await songToDelete.deleteOne();

    const songs = await Song.find({sessionId:sessionIdd});
    res.json(songs);
});

const getTwoSongs = asyncHandler(async(req,res)=>{
    try{
        console.log("Trying to get songs");
        const songs = await Song.find({sessionId:sessionIdd}).limit(2);
        res.json([songs]);
    }
    catch(error){
        
        console.log("Could not get songs");
        res.json({"message":"Could not fetch two songs"});
    }
});
const  getSongs = asyncHandler(async(req,res)=>{
    try{
        
        console.log("Trying to get songs");
        console.log(sessionIdd);
        const songs = await Song.find({sessionId:sessionIdd});
        console.log(songs);
        res.json([songs]);
    }
    catch(error){
        console.log(error);
        res.json({"message":"Could not fetch the songs"});
    }
});
module.exports={createSong,getSongs,deleteSong,getTwoSongs};