const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightsSchema = new Schema({
    FlightNumber:{
      type: String,
      required: false,
    },
    AirportTerminal:{
      type:String,
      required: false,
    },
    DepartureTime:{
      type:String,
      required: false,
    },
    ArrivalTime:{
      type:String,
      required: false,
    },
    From: {
      type: String,
      required: true,
    },
    To: {
      type: String,
      required: true
    },
    Flight_Date: {
      type: Date,
      required: true,
    },
    
    Arrival_Date: {
      type: Date,
      required: true,
    },
    Cabin: {
      type: String,
      required: true
    },
    Seats_Available_on_Flight: {
      type: Number,
      required: true
    },
    SeatsBooked: {
      type: Array,
      required: false
    },
    Baggage_Allowance: {
      type: Number,
      required: false
    },
    Trip_Duration: {
      type: Number,
      required: false
    },
    Price: {
      type: Number,
      required: false
    }
  }, { timestamps: true });
  
  const Flights = mongoose.model('Flights', flightsSchema);
  module.exports = Flights;