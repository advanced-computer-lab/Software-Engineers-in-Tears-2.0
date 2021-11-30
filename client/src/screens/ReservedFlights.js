import React, {useState, useEffect} from "react";
import axios from 'axios';

function ReservedFlights(props){
    const [loading, setLoading] = useState(true);
    const bookingID = props.match.params.bookingID;
    const [booking, setBooking] = useState({});
    
useEffect(() => {

    setLoading(true)

    axios.post('http://localhost:8000/getBookingByID/', {_id: bookingID})
    .then(res => {
        setBooking(res.data[0]);
    })

}, [bookingID]);//TODO:booking.userID


function deleteflight(id) {
    
    axios.delete("http://localhost:8000/deleteBooking/" + id)
      .then(() => {
        setBooking(booking.filter((booking) => {
          return booking._id !== id;
        }))
      }); 
  }

return(
    <p>hi</p>
)
}

export default ReservedFlights;