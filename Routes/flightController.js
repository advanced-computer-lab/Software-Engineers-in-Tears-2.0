const Flights = require('../Models/Flights');




exports.updateFlight = (req, res)=>{
  Flights.findByIdAndUpdate(req.params.id, req.body)
  .then(result => {
      res.status(200).send("Flight updated");
      console.log('Flight has been updated successfully')})
  .catch(err => console.log(err));
}


exports.createFlight = (req, res)=>{
  const FlightNumber= req.body.FlightNumber;
  const AirportTerminal= req.body.AirportTerminal;
  const DepartureTime= req.body.DepartureTime;
  const ArrivalTime= req.body.ArrivalTime;
  const From= req.body.From;
  const To= req.body.To;
  const Flight_Date= req.body.Flight_Date;
  const Cabin= req.body.Cabin;
  const Seats_Available_on_Flight= req.body.Seats_Available_on_Flight;
  const newFlight= new Flights({
    FlightNumber,
    AirportTerminal,
    DepartureTime,
    ArrivalTime,
    From,
    To,
    Flight_Date,
    Cabin,
    Seats_Available_on_Flight
  });
  newFlight.save();
}

exports.updateFlight = (req, res)=>{
    Flights.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
        res.status(200).send("Flight updated");
        console.log('Flight has been updated successfully')})
    .catch(err => console.log(err));
  }

exports.deleteFlight= (req,res) =>{
    Flights.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(200).send("Flight deleted");
      console.log('Flight has been deleted successfully')})
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
    console.log(req.body)
    Flights.find(
    {
      DepartureTime: req.body.DepartureTime,
      ArrivalTime: req.body.ArrivalTime,
      Flight_Date: req.body.Flight_Date,
      AirportTerminal: req.body.AirportTerminal,
      FlightNumber: req.body.FlightNumber
    }
    ).then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.viewFlightDetails = (req, res) => {
    Flights.findById(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => console.error(err));
  }

