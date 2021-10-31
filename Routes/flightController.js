const Flights = require('../Models/Flights');


exports.viewFlights = (req, res)=>{
    Flights.find({})
    .then(result => res.send(result))
    .catch(err => console.log(err));
  }


