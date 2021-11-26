const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors');
const flightController = require('./Routes/flightController.js');
const userController = require('./Routes/userController.js');
const bookingController = require('./Routes/bookingController.js');
require("dotenv").config({ path: "./config.env" });
const MongoURI = process.env.ATLAS_URI

//App variables
const app = express();
const port = process.env.PORT || "8000";
var cors = require('cors');

// configurations
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: false}));
app.use(cors({ origin: true, credentials: true }));

// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});

app.get("/adminflights", flightController.listAllFlights);
app.post("/getUserByID", userController.getUserByID);
app.post("/adminsearchflights", flightController.searchFlights);
app.post("/createbooking", bookingController.createBooking);
app.post("/getBookingByID", bookingController.getBookingByID);
app.put("/updateBooking/:id", bookingController.updateBooking);
app.put("/addBooking/:userID", userController.addBooking)
app.put('/adminUpdateFlight/:id', flightController.updateFlight);
app.get('/adminUpdateFlight/:id', flightController.viewFlightDetails);
app.post("/admincreateflights", flightController.createFlight);
app.post("/viewFlightDetails", flightController.viewFlightDetails)
app.delete("/adminflights/delete/:id",flightController.deleteFlight);

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
