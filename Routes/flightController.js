const Flights = require('../Models/Flights');


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