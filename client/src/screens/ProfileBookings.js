import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ButtonIcon from "../components/ButtonIcon";
import Button1 from "../components/Button1";
import Modal from 'react-bootstrap/Modal';
import Button2 from "../components/Button2";
import ReactLoading from 'react-loading';

function ProfileBookings(props) {

  const history = useHistory();

  const [user, setUser] = useState({});
  const userID = localStorage.getItem("userID");
  const [cancelModal, setCancelModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const bookingID = props.match.params.bookingID;
  const [bookings, setBookings] = useState([]);
  const [toDelete, setToDelete] = useState({});
  const id1 = useState(props.match.params.id1)[0];
  const [departFlights, setDepartFlights] = useState({});
  const [returnFlights, setReturnFlights] = useState({});
  const [i, seti] = useState();

  useEffect(() => {
    if (userID) {
      axios.post('http://localhost:8000/getUserByID/', { _id: userID })
        .then(res => {
          setUser(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        })
    }

    // axios.post('http://localhost:8000/getBookingByID/', { _id: bookingID })
    //   .then(res => {
    //     setBookings(res.data);
    //   })
    getData();


  }, [userID, bookingID]);


  function getFlight(id) {
    axios.post('http://localhost:8000/adminsearchflights/', { _id: id })
      .then(res => {
        return res.data[0];
      })
      .catch(err => {
        console.log(err);
        return null;
      })

  }
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
        var emailText = `Your flight reservation (ID: ${toDel._id}) from (${departFlights[toDel.departFlightID].From}) to (${departFlights[toDel.departFlightID].To}) has been cancelled upon your request.(${TotalPrice}) will be refunded to your bank account`;
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

        const arrF1 = departFlights[toDel.departFlightID].SeatsBooked.filter((b) => {
          return !toDel.departFlightSeats.includes(b);
        })
        const arrF2 = returnFlights[toDel.returnFlightID].SeatsBooked.filter((b) => {
          return !toDel.returnFlightSeats.includes(b);
        })

        axios.put('http://localhost:8000/adminUpdateFlight/' + toDel.departFlightID, { SeatsBooked: arrF1 })
          .then(res => {
            console.log('dep updated')

            const newDep = {...departFlights}
            newDep[toDel.departFlightID].SeatsBooked = arrF1;
            setDepartFlights(newDep);
            
          })
        axios.put('http://localhost:8000/adminUpdateFlight/' + toDel.returnFlightID, { SeatsBooked: arrF2 })
          .then(res => {
            console.log('ret updated')

            const newRet = {...returnFlights}
            newRet[toDel.returnFlightID].SeatsBooked = arrF2;
            setReturnFlights(newRet);
          })

        axios.post('http://localhost:8000/sendMail', mailOptions)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err));

      })
      .catch(err => console.log(err));
  }



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
            onClick={() => { deleteBooking(toDelete); setCancelModal(false) }}
          />
        </Modal.Footer>
      </Modal>


      <Container style={{ display: "flex", flexDirection: 'row', opacity: cancelModal === true ? 0.5 : 1, pointerEvents: cancelModal === true ? 'none' : 'initial' }}>
        <head>
          <script src="https://smtpjs.com/v3/smtp.js"></script>
        </head>
        <div id='sidebar' style={{ position: 'fixed', minWidth: '13%', backgroundColor: '#000', display: 'flex', flexDirection: 'column', height: window.innerHeight, marginBottom: -35, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '13%', backgroundColor: '#000', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 30 }}>
            <Image2
              src={require("../assets/images/profile-icon.png").default}
            />
            <label style={{ color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 20 }}>{user.First_Name}</label>
          </div>
          <Button1 style={{ width: 170, height: 40, fontSize: 15, position: 'absolute', top: 100 }} title={'Back To Home Page'} onClick={() => history.push('/')} />
          <ButtonIcon path={'home'} style={{ width: '100%', height: 70, fontSize: 15 }} title={'Home'} onClick={() => history.push('/profile/home')} />
          <ButtonIcon path={"profile2"} style={{ width: '100%', height: 70, fontSize: 15 }} title={'My Profile'} onClick={() => history.push('/profile/account')} />
          <ButtonIcon path={"wallet"} style={{ width: '100%', height: 70, fontSize: 15 }} title={'Wallet'} />
          <ButtonIcon path={"bookings"} style={{ width: '100%', height: 70, fontSize: 15 }} title={'Bookings'} selected={true} />
          <Button1 style={{ width: 100, height: 40, fontSize: 15, position: 'absolute', bottom: 30 }} title={'Logout'} onClick={() => { localStorage.clear(); history.push('/') }} />
        </div>

        {/* page loading handling */}
        {loading ?
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: window.innerWidth, height: window.innerHeight, backgroundColor: 'rgb(244, 244, 244)', marginLeft: '13%' }}>
            <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
          </div>
          :
          /*screen excluding nav bar */
          <div style={{ display: 'flex', flexDirection: 'column', width: window.innerWidth, height: window.innerHeight, alignItems: 'center', marginLeft: '13%' }}>
            {/* page title */}
            <label style={{ color: '#000000', fontFamily: 'Archivo Black', fontSize: 20 }}> Your Reservations </label>
            {/* grey boxes */}

            {
              bookings.length > 0 ?
                bookings.map((onebooking, i) => {
                  console.log(bookings.length);
                  var TPrice = (departFlights[onebooking.departFlightID].Price * onebooking.PassengerCount) + (returnFlights[onebooking.returnFlightID].Price * onebooking.PassengerCount);
                  return (
                    <div style={{ width: '90%', height: 400, backgroundColor: '#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 150, paddingTop:20 }}>
                      {/* text inside boxes */}
                      <label style={{ marginLeft: 30, marginTop: 200 }}>
                        <label style={{ color: '#000000', fontFamily: 'Archivo Black', fontSize: 20, marginTop:50 }}>Booking Number: {' ' + onebooking._id} <br /></label>
                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> PassengerCount:
                          {' ' + onebooking.PassengerCount}
                          <br />
                        </label>
                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> Total Price: $
                          {(TPrice)}
                          <br />
                        </label>
                        <label style={{ color: '#000000', fontFamily: 'Archivo Black', fontSize: 20, marginLeft: 30 }}>Departure Flight Details:</label>
                        <br />
                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> From:
                          {' ' + (departFlights[onebooking.departFlightID] ? departFlights[onebooking.departFlightID].From : "NA")}
                          <br />
                        </label>
                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> To:
                          {' ' + (departFlights[onebooking.departFlightID] ? departFlights[onebooking.departFlightID].To : "NA")}
                          <br />
                        </label>

                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> Departure Flight Seats:
                          {' ' + onebooking.departFlightSeats.join(', ')}
                        </label>
                        <br />

                        <label style={{ color: '#000000', fontFamily: 'Archivo Black', fontSize: 20, marginLeft: 30 }}>Return Flight Details: </label>
                        <br />

                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> From:
                          {' ' + (departFlights[onebooking.departFlightID] ? departFlights[onebooking.departFlightID].To : "NA")}
                          <br />
                        </label>
                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> To:
                          {' ' + (departFlights[onebooking.departFlightID] ? departFlights[onebooking.departFlightID].From : "NA")}
                          <br />
                        </label>
                        <label style={{ color: '#000000', fontSize: 20, marginLeft: 30 }}> Return Flight Seats:
                          {' ' + onebooking.returnFlightSeats.join(', ')}
                        </label>

                      </label>
                      <div style={{ display: 'flex', flexDirection: 'row' , justifyContent:'flex-end'}}>
                        <Button1
                          title={'View Iternary'}
                          style={{ width: 200, height: 50, marginTop: 30, marginBottom: 70 }}
                          onClick={() => { history.push({
                            pathname:`/iternary/${onebooking.departFlightID}/${onebooking.returnFlightID}/${onebooking.departFlightSeats.length}`,
                            booking:onebooking
                          }) 
                        }}
                        />
                        <Button1
                          title={'Cancel Reservation'}
                          style={{ width: 200, height: 50, marginTop: 30, marginBottom: 70, marginLeft:20, marginRight:20}}
                          onClick={() => { setCancelModal(true); setToDelete(onebooking); seti(i) }}
                        />
                      </div>
                      <label></label>
                    </div>
                  );
                }
                )
                :
                null
            }
          </div>
        }
      </Container>



    </>
  );
}

const Container = styled.div`
`;

const Image2 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default ProfileBookings;