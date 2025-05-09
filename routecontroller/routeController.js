
const asyncHandler = require("express-async-handler");
const {createSong }= require("../routecontroller/song-route-controller");
const axios = require("axios");
require("dotenv").config();
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_PLAYLIST_URL = "https://api.spotify.com/v1/playlists/";
let count=0;
const getSpotifyAccessToken = asyncHandler(async () => {
    try {
        const response = await axios.post(
            SPOTIFY_TOKEN_URL,
            new URLSearchParams({ grant_type: "client_credentials" }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString("base64")}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        console.log(" Access Token:", response.data.access_token); 
        return response.data.access_token;

    } catch (error) {
        console.error(" Error getting access token:", error.response?.data || error.message);
        return null;
    }
});

const getSongs = asyncHandler(async (req, res) => {
    const playlistId = req.params.id;
    const sessionId = req.query.session;
    console.log(playlistId);
    const accessToken = await getSpotifyAccessToken();

    if (!accessToken) {
        return res.status(500).json({ error: "Failed to get access token" });
    }

    try {
        const response = await axios.get(`${SPOTIFY_PLAYLIST_URL}${playlistId}/tracks`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
  console.log(sessionId);
        
        const tracks = response.data.items.map((item) => ({
            name: item.track.name,
            artist: item.track.artists.map((artist) => artist.name).join(", "),
            spotify_url: item.track.external_urls.spotify,
            sessionId:sessionId,
        }));
         count = tracks.length;
        try {

            const savedSongs = await createSong(tracks,sessionId);
            console.log(count);
        } catch (e) {
            console.log(e);
            console.log("nah lil bro");
        }
        
        res.status(200).json(tracks);

    } catch (error) {
        console.error("Error fetching playlist:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch playlist", details: error.response?.data });
    }
});


module.exports={getSongs};