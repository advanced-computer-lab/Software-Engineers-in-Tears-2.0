const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors');
const flightController = require('./Routes/flightController.js');
require("dotenv").config({ path: "./config.env" });
const MongoURI = process.env.ATLAS_URI

//App variables
const app = express();
const port = process.env.PORT || "8000";
//const Flights = require('./models/Flights');    once collections are altered

// configurations
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));

// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});


app.get("/adminFlights", flightController.listAllFlights);
app.get("/adminSearchFlights", flightController.searchFlights);



// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
