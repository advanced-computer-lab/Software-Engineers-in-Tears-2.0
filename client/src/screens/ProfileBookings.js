import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";
import Button1 from "../components/Button1";
import Modal from 'react-bootstrap/Modal';
import Button2 from "../components/Button2";
import BookingCard from "../components/BookingCard";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';

function ProfileBookings(props) {

  const history = useHistory();

  const firstName = useState(localStorage.getItem('firstName'))[0];

  const [user, setUser] = useState({});
  const [cancelModal, setCancelModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [toDelete, setToDelete] = useState({});
  const [departFlights, setDepartFlights] = useState({});
  const [returnFlights, setReturnFlights] = useState({});
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(!res.data.isLoggedIn){
          localStorage.clear()
          history.push('/')
        }
        else if(res.data.Type === 'administrator'){
          history.push('/admin')
        }
      })
      .catch(err => {
        console.log(err);
      })
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // function getFlight(id) {
  //   axios.post('http://localhost:8000/adminsearchflights/', { _id: id })
  //     .then(res => {
  //       return res.data[0];
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       return null;
  //     })
  // }

  const getData = async () => {
    const res = await axios.post('http://localhost:8000/getUserByID/', { _id: localStorage.getItem("userID") });
    setUser(res.data[0]);
    console.log(res.data[0].Bookings[0]);
    const arr = [];
    const arr2 = {};
    const arr3 = {};
    for (let i = res.data[0].Bookings.length-1; i >=0 ; i--) {
      
      let res2 = await axios.post('http://localhost:8000/getBookingByID/', { _id: res.data[0].Bookings[i] })
      console.log(res2);
      if (!res2) {
        console.log('in if statement')
        continue;
      }
      arr.push(res2.data[0]);
      if (!arr2[res2.data[0].departFlightID]) {
        let res3 = await axios.post('http://localhost:8000/adminsearchflights/', { _id: res2.data[0].departFlightID })
        arr2[res2.data[0].departFlightID] = res3.data[0];
      }
      if (!arr3[res2.data[0].returnFlightID]) {
        let res4 = await axios.post('http://localhost:8000/adminsearchflights/', { _id: res2.data[0].returnFlightID })
        arr3[res2.data[0].returnFlightID] = res4.data[0];
      }
    }
    console.log('Bookings: ', arr)
    console.log('Dep: ', arr2)
    console.log('Ret: ', arr3)
    setBookings(arr);
    setDepartFlights(arr2);
    setReturnFlights(arr3);
    setLoading(false);
  }

  function deleteBooking(toDel) {

    setLoading(true);
    axios.delete("http://localhost:8000/deleteBooking/" + toDel._id, toDel)
      .then(() => {
        setBookings(bookings.filter((booking) => {
          return booking._id !== toDel._id;
        }))

        var TotalPrice = (departFlights[toDel.departFlightID].Price * toDel.PassengerCount) + (returnFlights[toDel.returnFlightID].Price * toDel.PassengerCount);
        var emailText = `Your flight reservation (ID: ${toDel._id}) from (${departFlights[toDel.departFlightID].From}) to (${departFlights[toDel.departFlightID].To}) has been cancelled upon your request.($${TotalPrice}) will be refunded to your bank account`;
        let mailOptions = {
          from: 'dunesairlines@gmail.com',
          to: user.Email,
          subject: 'Booking Cancelation',
          text: emailText,
          html: `<p> ${emailText}</p>`,
        };
        
        const array = user.Bookings.filter((b) => {
          return b !== toDel._id;
        });
        axios.put('http://localhost:8000/updateUser/' + user._id, { Bookings: array })
          .then(res => {
            console.log('User updated')

            const newUser = {...user}
            newUser['Bookings'] = array;
            setUser(newUser);

            setLoading(false);
          })
          .catch(err =>{
            console.log(err);
          })

        // const arrF1 = departFlights[toDel.departFlightID].SeatsBooked.filter((b) => {
        //   return !toDel.departFlightSeats.includes(b);
        // })
        // const arrF2 = returnFlights[toDel.returnFlightID].SeatsBooked.filter((b) => {
        //   return !toDel.returnFlightSeats.includes(b);
        // })

        // axios.put('http://localhost:8000/adminUpdateFlight/' + toDel.departFlightID, { SeatsBooked: arrF1 })
        //   .then(res => {
        //     console.log('dep updated')

        //     const newDep = {...departFlights}
        //     newDep[toDel.departFlightID].SeatsBooked = arrF1;
        //     setDepartFlights(newDep);
            
        //   })
        // axios.put('http://localhost:8000/adminUpdateFlight/' + toDel.returnFlightID, { SeatsBooked: arrF2 })
        //   .then(res => {
        //     console.log('ret updated')

        //     const newRet = {...returnFlights}
        //     newRet[toDel.returnFlightID].SeatsBooked = arrF2;
        //     setReturnFlights(newRet);
        //   })

        axios.post('http://localhost:8000/sendMail', mailOptions)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err));

      })
      .catch(err => console.log(err));
  }

  function emailItinerary(booking, flight1, flight2){
    setEmailLoading(true);
    var emailString = `Here are the details of your round trip from ${flight1.From} to ${flight1.To} and back:
        Your booking ID is ${booking._id}
        Departure Fight:
        From: ${flight1.From} To: ${flight1.To}
        Takeoff: ${flight1.Flight_Date.toString().substring(0, 10)} at ${flight1.DepartureTime}
        Landing: ${flight1.Arrival_Date.toString().substring(0, 10)} at ${flight1.ArrivalTime}
        Flight Number: ${flight1.FlightNumber}
        Number of Passengers: ${booking.departFlightSeats.length}
        Cabin: ${flight1.Cabin}
        Seat Number(s): ${booking.departFlightSeats.join(', ')}
        Baggage Allowance: ${flight1.Baggage_Allowance} kg
            
        Return Flight:
        From: ${flight2.From} To: ${flight2.To}
        Takeoff: ${flight2.Flight_Date.toString().substring(0, 10)} at ${flight2.DepartureTime}
        Landing: ${flight2.Arrival_Date.toString().substring(0, 10)} at ${flight2.ArrivalTime}
        Flight Number: ${flight2.FlightNumber}
        Number of Passengers: ${booking.returnFlightSeats.length}
        Cabin: ${flight2.Cabin}
        Seat Number(s): ${booking.returnFlightSeats.join(', ')}
        Baggage Allowance: ${flight2.Baggage_Allowance} kg
            
        Please use the following link to access your reservations.
        http://localhost:3000/profile/bookings`; 
            let mailOptions = {
                from: 'dunesairlines@gmail.com',
                to: user.Email,
                subject: 'Flight Itinerary',
                text:  `${emailString}`
              };

            axios.post('http://localhost:8000/sendMail', mailOptions)
            .then(res => {
              setEmailLoading(false);
            console.log(res.data);
            })
            .catch(err => console.log(err));
  }

  const [hover1, setHover1] = useState('black');
  const [hover2, setHover2] = useState('black');
  const [hover3, setHover3] = useState('#F0A500');
  const [hover4, setHover4] = useState('black');
  const [hover5, setHover5] = useState('black');

  return (
    <>
      <Modal style={{ width: '40%', position: 'fixed', top: '35%', left: '30%', backgroundColor: '#000000', borderRadius: 20, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', zIndex: 1000 }} show={cancelModal}>
        <Modal.Header>
          <Modal.Title style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo Black', textAlign: 'center', marginTop: 40 }}>Are you sure you want to cancel this reservation?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 120 }}>
          <Button2
            title={'No'}
            style={{ width: 150, height: 50 }}
            onClick={() => setCancelModal(false)}
          />
          <Button1
            title={'Yes'}
            style={{ width: 150, height: 50, marginLeft: 20 }}
            onClick={() => {deleteBooking(toDelete); setCancelModal(false)}}
          />
        </Modal.Footer>
      </Modal>
      <Container style={{display: "flex", flexDirection: 'column', opacity: cancelModal === true ? 0.5 : 1, pointerEvents: cancelModal === true ? 'none' : 'initial'}}>
      <Header title={firstName} selected={'Name'}/>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: 200}}>
          <label onMouseEnter={() => setHover1('#CF7500')} onMouseLeave={() => setHover1('black')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15}} onClick={() => history.push('/profile/home')}>Home</label>
          <label onMouseEnter={() => setHover2('#CF7500')} onMouseLeave={() => setHover2('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2}} onClick={() => history.push('/profile/account')}>My Account</label>
          <label onMouseEnter={() => setHover3('#CF7500')} onMouseLeave={() => setHover3('#F0A500')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3}} onClick={() => history.push('/profile/bookings')}>My Bookings</label>
          <label onMouseEnter={() => setHover4('#CF7500')} onMouseLeave={() => setHover4('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover4}} onClick={() => history.push('/profile/changepassword')}>Change Password</label>
          <label onMouseEnter={() => setHover5('#CF7500')} onMouseLeave={() => setHover5('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover5}} onClick={() => {history.push('/'); localStorage.clear()}}>Log Out</label>
        </div>
        {loading ?
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: window.innerWidth-200, height: window.innerHeight, marginLeft: 50, marginRight: 180 }}>
            <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
          </div>
          :
          <div style={{ display: 'flex', flexDirection: 'column', width: window.innerWidth-200, marginLeft: 50}}>
            {bookings.length > 0 ? <label style={{ color: '#000000', fontFamily: 'Archivo', fontSize: 24, textAlign: 'center', marginTop: 20, marginRight: 180}}> Your Reservations </label> : null}
            {
              bookings.length > 0 ?
                bookings.map((onebooking) => {
                  var TPrice = (departFlights[onebooking.departFlightID].Price * onebooking.PassengerCount) + (returnFlights[onebooking.returnFlightID].Price * onebooking.PassengerCount);
                  return (
                    <BookingCard
                    emailLoading={emailLoading}
                    EmailItinerary={()=>emailItinerary(onebooking, departFlights[onebooking.departFlightID], returnFlights[onebooking.returnFlightID])}
                    DeleteBooking={() => {setCancelModal(true); setToDelete(onebooking)}} 
                    DepartFlight={departFlights[onebooking.departFlightID]} 
                    ReturnFlight={returnFlights[onebooking.returnFlightID]} 
                    Price={TPrice} Booking={onebooking}/>
                  );
                })
                :
                <div style={{display: 'flex', flexDirection: 'column', height: 300, justifyContent: 'center'}}>
                  <Image src={require("../assets/images/i.png").default} style={{width: 60, height: 60, alignSelf: 'center', marginRight: 180, marginTop: 20}}/>
                  <label style={{ color: '#000000', fontFamily: 'Archivo Black', fontSize: 22, textAlign: 'center', marginTop: 20, marginRight: 180}}> No Reservations </label> 
                  <label style={{ color: '#000000', fontFamily: 'Archivo', fontSize: 24, textAlign: 'center', marginTop: 20, marginRight: 180}}>You currently have no reservations to view.</label> 
                </div>
            }
          </div>
        }
        </div>
    <Footer />
  </Container>
  </>
);
}

const Container = styled.div`
`;

const Image = styled.img`
`;

export default ProfileBookings;