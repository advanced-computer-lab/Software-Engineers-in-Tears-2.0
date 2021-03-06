const Flights = require('../Models/Flights');

exports.createFlight = (req, res)=>{
  const FlightNumber= req.body.FlightNumber;
  const AirportTerminal= req.body.AirportTerminal;
  const DepartureTime= req.body.DepartureTime;
  const ArrivalTime= req.body.ArrivalTime;
  const From= req.body.From;
  const To= req.body.To;
  const Flight_Date= req.body.Flight_Date;
  const Arrival_Date= req.body.Arrival_Date;
  const Cabin= req.body.Cabin;
  const Baggage_Allowance= req.body.Baggage_Allowance;
  const Trip_Duration =req.body.Trip_Duration;
  const Price =req.body.Price;
  const Seats_Available_on_Flight= req.body.Seats_Available_on_Flight;
  const newFlight= new Flights({
    FlightNumber,
    AirportTerminal,
    DepartureTime,
    ArrivalTime,
    From,
    To,
    Flight_Date,
    Arrival_Date,
    Cabin,
    Seats_Available_on_Flight,
    Baggage_Allowance,
    Trip_Duration,
    Price

  });
  newFlight.save();
}

exports.updateFlight = (req, res)=>{
    Flights.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
        res.status(200).send("Flight updated");
        console.log('Flight has been updated successfully')})
    .catch(err => {console.log(err); res.status(500);});
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
    // req.body
    var terms = {};
    for(elem in req.body){
      if(!isNullorWhiteSpace(req.body[elem])){
        terms[elem] = req.body[elem];
      }
    }
    Flights.find(terms)
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.viewFlightDetails = (req, res) => {
    Flights.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // exports.getFlightName = (req,res)=> {
  //   Flights.findById(req.params.id)
  //   .then (result =>{
  //     res.send(result.To);
  //     console.log(result);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // }
  function isNullorWhiteSpace(string) {
    if (string == null) {
      return true;
    }
    if (typeof (string) != "string") {
      return false;
    };
  
    const x = string.trim();
    return x.length === 0;
  }
