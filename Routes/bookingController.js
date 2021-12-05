const Bookings = require('../Models/Bookings');
const Flights= require ('../Models/Flights');

// const nodemailer = require ('nodemailer');
//   let transporter= nodemailer.createTransport({
//     service: 'gmail',
    
//     auth: {
//         user: 'dunesairlines@gmail.com',
//         pass: 'SEIT2.0!',
//       },
// })

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

// let mailOptions={
//     from:'dunesairlines@gmail.com',
//     to:"aya_saleh2@yahoo.com",
//     subject:'Booking Cancelation',
//     text:'hello',
//     html:'<p> Your flight reservation has been cancelled upon ypur request.The amount will be refunded to your bank account</p>',
//   };

exports.deleteBooking =(req,res)=>{
  Bookings.findByIdAndDelete(req.params.id)
  //Flights.findById(req.departFlightID)  TODO: decrement the seatsBooked array
  .then(result => {
    res.status(200).send("Reservation Deleted");
    console.log('Booking has been deleted successfully');
    // transporter.sendMail(mailOptions,function(err,data){
    //     if(err){
    //         console.log('Error Occurs',err);
    //     }
    //     else{
    //         console.log('Email sent');
    //     }
    //   })
  })
    .catch(err => console.log(err));
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