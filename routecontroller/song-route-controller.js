const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Song = require('../schema/songs');
let count = 0;
const createSongs = asyncHandler(async (req, res) => {
    try {
        const users = req.body;
        if (!Array.isArray(users)) {
            return res.status(400).json({ error: "Invalid data format, expected an array" });
        }
        
        await Song.deleteMany({});
        console.log("Cleared the songs");

        const songs = await Promise.all(users.map(async ({ name, artist,spotify_url }) => {
            return await Song.create({ name, artist,spotify_url });
        }));

        res.json(songs);
        console.log("Success");
    } catch (error) {
        res.json({ error: error.message });
    }
});
const createSong = async (tracks) => {
    try {
        console.log("Received in createSong:", JSON.stringify(tracks, null, 2));

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

    if (!songToDelete) {
        return res.status(404).json({ message: "Song not found" });
    }

    const totalSongs = await Song.countDocuments();
    if (totalSongs === 1) {
        return res.status(400).json({ message: "Cannot delete the last song" });
    }

    await songToDelete.deleteOne();

    const songs = await Song.find();
    res.json(songs);
});

const getTwoSongs = asyncHandler(async(req,res)=>{
    try{
        console.log("Trying to get songs");
        const songs = await Song.find().limit(2);
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
        const songs = await Song.find();
        res.json([songs]);
    }
    catch(error){
        console.log("Could not get songs");
        res.json({"message":"Could not fetch the songs"});
    }
});
module.exports={createSong,createSongs,getSongs,deleteSong,getTwoSongs};