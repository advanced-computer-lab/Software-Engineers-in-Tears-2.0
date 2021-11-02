const Flights = require('../Models/Flights');
const express = require("express");
const router=express.Router();
module.exports=router;


router.route("/createflight").post((req,res)=>{
  const From= req.body.From;
  const To= req.body.To;
  const Flight_Date= req.body.Flight_Date;
  const Cabin= req.body.Cabin;
  const Seats_Available= req.body.Seats_Available;
  const newFlight= new Flights({
    To,
    From,
    Flight_Date,
    Cabin,
    Seats_Available
  });
  newFlight.save();
}
)
g
exports.updateFlight = (req, res)=>{
    Flights.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
        res.status(200).send("Flight updated");
        console.log('Flight has been updated successfully')})
    .catch(err => console.log(err));
  }


  exports.listAllFlights = (req, res) => {
    Flights.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };


  exports.searchFlights = (req, res) => {
    Flights.find(
      (req.body != '' ? {FlightNumber: req.body.FlightNumber} : null),
      (req.body != '' ? {DepartureTime: req.body.DepartureTime} : null),
      (req.body != '' ? {ArrivalTime: req.body.ArrivalTime} : null),
      (req.body != '' ? {Flight_Date: req.body.Flight_Date} : null)
      (req.body != '' ? {AirportTerminal: req.body.AirportTerminal} : null),  
      ).then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

