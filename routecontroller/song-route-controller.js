const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Song = require('../schema/songs');
const connectDb =require('../dbConnection/connect.js');
let count = 0;
const createSong = async (tracks,sessionId) => {
    try {
        console.log("Received in createSong:");

        await Song.deleteMany({sessionId});

        if (!Array.isArray(tracks) || tracks.length === 0) {
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
    const sessionId = localStorage.getItem("sessionId");
    if (!songToDelete) {
        return res.status(404).json({ message: "Song not found" });
    }

    const totalSongs = await Song.countDocuments({sessionId});
    if (totalSongs === 1) {
        return res.status(400).json({ message: "Cannot delete the last song" });
    }

    await songToDelete.deleteOne();

    const songs = await Song.find({sessionId});
    res.json(songs);
});

const getTwoSongs = asyncHandler(async(req,res)=>{
    try{
        const sessionId = localStorage.getItem("sessionId");
        console.log("Trying to get songs");
        const songs = await Song.find({sessionId}).limit(2);
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
        const songs = await Song.find({sessionId});
        res.json([songs]);
    }
    catch(error){
        console.log("Could not get songs");
        res.json({"message":"Could not fetch the songs"});
    }
});
module.exports={createSong,getSongs,deleteSong,getTwoSongs};