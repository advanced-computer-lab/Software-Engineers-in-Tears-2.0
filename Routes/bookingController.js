const Bookings = require('../Models/Bookings');

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
    })
    .catch(err => {
      console.log(err);
    });
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