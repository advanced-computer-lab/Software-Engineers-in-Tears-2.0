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
      (true != null ? {FlightNumber: '540'} : null),
      (true != null ? {AirportTerminal: 'E1'} : null),  
      ).then(result => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
      })
      .catch(err => {
        console.log(err);
      });
  };

