const asyncHandler = require("express-async-handler");
const Song = require('../schema/songs');
const createSongs = asyncHandler(async (req, res) => {
    try {
        const users = req.body;

        if (!Array.isArray(users)) {
            return res.status(400).json({ error: "Invalid data format, expected an array" });
        }

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
module.exports={createSong,createSongs,getSongs};