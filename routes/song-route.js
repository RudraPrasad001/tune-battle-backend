const express = require("express");
const songRouter = express.Router();
const {getSongs,deleteSong,getTwoSongs}= require("../routecontroller/song-route-controller");
songRouter.route('/getSongs').get(getSongs);
songRouter.route('/getTwoSongs').get(getTwoSongs);
songRouter.route('/delSong/:id').get(deleteSong);

module.exports=songRouter;