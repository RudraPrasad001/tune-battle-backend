require("dotenv").config();
const connectDb =require('./dbConnection/connect');
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;
connectDb();
app.use(cors());
app.use(express.json());

app.use("/playlist",require("./routes/route") );
app.use("/songs",require('./routes/song-route'));
require("dotenv").config();


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));