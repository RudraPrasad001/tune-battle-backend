const express = require("express");
const router = express.Router();
const {getSongs} = require("../routecontroller/routeController");
router.route("/:id").get(getSongs);
module.exports=router;