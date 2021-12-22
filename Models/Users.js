const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Home_Address: {
    type: String,
    required: true
  },
  Telephone_Number: {
    type: String,
    required: true
  },
  Passport_Number: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true
  },
  Bookings: {
    type: Array,
    required: false
  },
  Type: {
    type: String,
    required: true
  }
}, { timestamps: true });
mongoose.models = {}
const Users = mongoose.model('Users', usersSchema);
module.exports = Users;