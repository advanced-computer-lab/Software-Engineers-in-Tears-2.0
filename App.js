const express = require("express");
const mongoose = require('mongoose');
const flightController = require('./Routes/flightController');
require("dotenv").config({ path: "./config.env" });
const MongoURI = process.env.ATLAS_URI
const router = express.Router();
module.exports = router;

//App variables
const app = express();
const port = process.env.PORT || "8000";
var cors = require('cors');

const flights = require('./Routes/flightController');

//const Flights = require('./models/Flights');

// configurations
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));




// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


app.use("/",require("./Routes/flightController"));

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});


//app.get("/admin", flightController.listAllFlights);


app.use('/Routes/flightController', flights);

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
