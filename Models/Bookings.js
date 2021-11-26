const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingsSchema = new Schema({
    departFlightID:{
      type: String,
      required: true,
    },
    returnFlightID:{
        type: String,
        required: true,
    },
    PassengerCount:{
        type: Number,
        required: true,
    },
    userID:{
        type: String,
        required: true,
    },
    departFlightSeats:{
        type: Array,
        required: false,
    },
    returnFlightSeats:{
        type: Array,
        required: false,
    }
  }, { timestamps: true });
  
  const Bookings = mongoose.model('Bookings', bookingsSchema);
  module.exports = Bookings;