const express = require("express");
const songRouter = express.Router();
const {createSongs,getSongs}= require("../routecontroller/song-route-controller");
songRouter.route('/createSong').post(createSongs);
songRouter.route('/getSongs').get(getSongs);
module.exports=songRouter;