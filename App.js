const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var cors = require('cors');
const flightController = require('./Routes/flightController.js');
const userController = require('./Routes/userController.js');
const bookingController = require('./Routes/bookingController.js');
const auth = require('./Routes/auth.js');
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

function verifyJWT(req,res,next) {
  const token = req.headers["x-access-token"]?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) return res .json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
      req.user= {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next()
    })
  } else{
    res.json({message: "Incorrect Token Given ", isLoggedIn : false})
  }
}

app.get("/getname", verifyJWT, (req, res) => {
  res.send({isLoggedIn: true, First_Name: req.user.First_Name});
});

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});

app.get("/adminflights", flightController.listAllFlights);
app.post("/login", userController.login);
app.get('/adminUpdateFlight/:id', flightController.viewFlightDetails);
app.post("/getUserByID", userController.getUserByID);
app.post("/adminsearchflights", flightController.searchFlights);
app.post("/createbooking", bookingController.createBooking);
app.post("/getBookingByID", bookingController.getBookingByID);
app.post("/admincreateflights", flightController.createFlight);
app.post("/viewFlightDetails", flightController.viewFlightDetails);
app.post("/sendMail", auth.sendMail);
app.post("/createuser", userController.createUser);
app.put("/updateBooking/:id", bookingController.updateBooking);
app.put("/updateUser/:userID", userController.updateUser)
app.put('/adminUpdateFlight/:id', flightController.updateFlight);
app.delete("/deleteBooking/:id", bookingController.deleteBooking);
app.delete("/adminflights/delete/:id", (req, res)=>{
  flightController.deleteFlight(req, res);
  bookingController.getBookingsForFlight(req, res)
  .then(bookings =>{
    bookings.map(booking =>{
      var fake = {
        params:{
          id:booking.id
        }
      }
      // console.log(fake.params.id)
      bookingController.deleteBooking(fake, res);
    })

    userController.updateAllUsersWithBooking(bookings, res);

  })
  
});
//app.post("/displayFlightFrom/:id",flightController.getFlightName);

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
