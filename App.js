const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors');
const flightController = require('./Routes/flightController.js');
require("dotenv").config({ path: "./config.env" });
const MongoURI = process.env.ATLAS_URI

//App variables
const app = express();
const port = process.env.PORT || "8000";
var cors = require('cors');

//const flights = require('./Routes/flightController');

//const Flights = require('./models/Flights');  once collections are altered

// configurations
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: false}));
app.use(cors({ origin: true, credentials: true }));

// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


//app.use("/",require("./Routes/flightController"));

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});


app.get("/adminflights", flightController.listAllFlights);
app.post("/adminsearchflights", flightController.searchFlights);
app.put('/adminUpdateFlight/:id', flightController.updateFlight);
app.get('/adminUpdateFlight/:id', flightController.viewFlightDetails);
app.post("/admincreateflights", flightController.createFlight);



// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
