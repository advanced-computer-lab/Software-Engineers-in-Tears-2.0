const Bookings = require('../Models/Bookings');
const Flights= require ('../Models/Flights');


exports.createBooking = (req, res)=>{
    const departFlightID= req.body.departFlightID;
    const returnFlightID= req.body.returnFlightID;
    const userID= req.body.userID;
    const PassengerCount= req.body.PassengerCount;
    const newBooking = new Bookings({
      departFlightID,
      returnFlightID,
      userID,
      PassengerCount
    });
    newBooking.save(function(err){
      res.send(newBooking);
  });
}

exports.updateBooking = (req, res)=>{
  Bookings.findByIdAndUpdate(req.params.id, req.body)
  .then(result => {
      res.status(200).send("Flight updated");
  })
  .catch(err => {console.log(err); res.status(500);});
}


exports.deleteBooking =(req,res)=>{
  
  Bookings.findByIdAndDelete(req.params.id)
  .then(result => {
    console.log('Booking has been deleted successfully');
    res.status(200).send("booking deleted kys");
  })
    .catch(err => {
      console.log(err);
      res.status(500).send(`Booking (id:${req.params.id}) deletion failed.`);
    });
}

exports.getBookingByID = (req, res) => {
  var terms = {};
  for(elem in req.body){
    if(!isNullorWhiteSpace(req.body[elem])){
      terms[elem] = req.body[elem];
    }
  }
  Bookings.find(terms)
  .then(result => {
      res.send(result);
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getBookingsForFlight =  (req,res)=>{
  const flightID = req.params.id;
  var bookingsPromise =  Bookings.find({
    $or:[{departFlightID:flightID}, {returnFlightID:flightID}],
    
  }, '_id userID');

  return bookingsPromise;
}


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