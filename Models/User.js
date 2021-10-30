const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  Age: {
    type: Number,
    required: true,
  },
  Home_Address: {
    type: String,
    required: true
  },
  Country_Code: {
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
  Type: {
    type: String,
    required: true
  }
}, { timestamps: true });
mongoose.models = {}
const User = mongoose.model('User', userSchema);
module.exports = User;