//dotenv configuration
require("dotenv").config();

//Import packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser:true,
})

const connection = mongoose.connection;

const accommodationRouter = require("./routes/Accommodations.js");


app.use("/accommodation", accommodationRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
})

connection.once("open", () => {
    console.log("Connected to MONGODB database successfully!");
})