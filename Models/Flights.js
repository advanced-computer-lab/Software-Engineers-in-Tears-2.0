const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightsSchema = new Schema({
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
    Cabin: {
      type: String,
      required: true
    },
    Seats_Available_on_Flight: {
      type: Number,
      required: true
    }
  }, { timestamps: true });
  
  const Flights = mongoose.model('Flights', flightsSchema);
  module.exports = Flights;