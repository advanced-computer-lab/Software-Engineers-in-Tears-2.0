import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ButtonIcon from "../components/ButtonIcon";
import Button1 from "../components/Button1";
import Modal from 'react-bootstrap/Modal';
import Button2 from "../components/Button2";
import ReactLoading from 'react-loading';
//import Bookings from "../../../Models/Bookings";
//import transporter from "../Routes/auth.js";
//include <script src="https://smtpjs.com/v3/smtp.js"></script>;
{/* <head>
	<script src="https://smtpjs.com/v3/smtp.js"></script>
</head> */}

function ProfileBookings(props) {
  
  const history = useHistory();
  
  const [user, setUser] = useState({});
  const userID = localStorage.getItem("userID");
  
  // const [dummyCounter, setDummyCounter] = useState(0);
  const [cancelModal, setCancelModal] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const bookingID = props.match.params.bookingID;
  const [bookings, setBookings] = useState([]);
  
  const [toDelete, setToDelete] = useState('');
  
  //const [flight, setFlight] = useState({});
  const id1 = useState(props.match.params.id1)[0];

  const [departFlights, setDepartFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  useEffect(() => {
    if(userID){
      axios.post('http://localhost:8000/getUserByID/', {_id: userID})
      .then(res => {
        setUser(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
    }

    axios.post('http://localhost:8000/getBookingByID/', {_id: bookingID})
    .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
     // getData();
      //setLoading(false);

  }, [userID,bookingID]);


  function getFlight(id){
    axios.post('http://localhost:8000/adminsearchflights/', {_id: id})
        .then(res => {
            return res.data[0];
           // setDummyCounter(dummyCounter +1);
           // setLoading(false);
        })
        .catch(err => {
            console.log(err);
            return null;
        })

  }
  const getData = async() => {
    const res = await axios.post('http://localhost:8000/getUserByID/', {_id: localStorage.getItem("userID")})
    setUser(res.data[0])
    console.log(res.data[0].Bookings[0])
    const arr = [];
    const arr2 = []
    const arr3 = []
    for(let i = 0; i < res.data[0].Bookings.length; i++){
      const res2 = await axios.post('http://localhost:8000/getBookingByID/', {_id: res.data[0].Bookings[i]})
      const res3 = await axios.post('http://localhost:8000/adminsearchflights/', {_id: res2.data[0].departFlightID})
      const res4 = await axios.post('http://localhost:8000/adminsearchflights/', {_id: res2.data[0].returnFlightID})
      arr.push(res2.data[0])
      arr2.push(res3.data[0])
      arr3.push(res4.data[0])
    }
    setBookings(arr)
    setDepartFlights(arr2)
    setReturnFlights(arr3)
    setLoading(false) 
}

  function deleteBooking(id) {
    
    axios.delete("http://localhost:8000/deleteBooking/" + id)
      .then(() => {
        setBookings(bookings.filter((booking) => {
          return booking._id !== id;

          //TODO:reduce seatsbooked
        }))
      }); 
  }


  // function sendEmail() {
  //   Email.send({
  //   Host: "smtp.gmail.com",
  //   Username :"dunesairlines@gmail.com" ,
  //   Password : "SEIT2.0!",
  //   To : 'aya_saleh2@yahoo.com',
  //   From : "dunesairlines@gmail.com",
  //   Subject : "booking cancellation",
  //   Body : "ur booking is zft",
  //   }).then(
  //     message => alert("mail sent successfully")
  //   );
  // }

  return (
    <>
    <Modal style={{ width: '40%', position: 'fixed', top: '35%', left: '30%', backgroundColor: '#000000', borderRadius: 20, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', zIndex: 1000 }} show={cancelModal}>
      <Modal.Header>
        <Modal.Title style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo Black', textAlign: 'center', marginTop: 40 }}>Are you sure you want to cancel this reservation?</Modal.Title>
      </Modal.Header>
      <Modal.Footer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 120 }}>
        <Button2
          title={'No'}
          style={{width: 150,height: 50 }}
          onClick={() => setCancelModal(false)}
        />
        <Button1
          title={'Yes'}
          style={{width: 150,height: 50,marginLeft: 20 }}
         onClick={() => { deleteBooking(toDelete); setCancelModal(false)}}
        />
      </Modal.Footer>
    </Modal>


    <Container style={{display: "flex", flexDirection: 'row'}}>
    <head>
	<script src="https://smtpjs.com/v3/smtp.js"></script>
   </head>
        <div style={{minWidth: 200, backgroundColor: '#000', display: 'flex', flexDirection: 'column', height: window.innerHeight, marginBottom: -35, alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: 200, backgroundColor: '#000', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 30}}>
                <Image2
                    src={require("../assets/images/profile-icon.png").default}
                />
                <label style={{color:'#F0A500', fontFamily: 'Archivo Black', fontSize: 20}}>{user.First_Name}</label>
            </div>
            <Button1 style={{width: 170, height: 40, fontSize: 15, position: 'absolute', top: 100}} title={'Back To Home Page'} onClick={() => history.push('/')}/>
            <ButtonIcon path={'home'} style={{width: '100%', height: 70, fontSize: 15}} title={'Home'} onClick={() => history.push('/profile/home')}/>
            <ButtonIcon path={"profile2"} style={{width: '100%', height: 70, fontSize: 15}} title={'My Profile'} onClick={() => history.push('/profile/account')}/>
            <ButtonIcon path={"wallet"} style={{width: '100%', height: 70, fontSize: 15}} title={'Wallet'}/>
            <ButtonIcon path={"bookings"} style={{width: '100%', height: 70, fontSize: 15}} title={'Bookings'} selected={true}/>
            <Button1 style={{width: 100, height: 40, fontSize: 15, position: 'absolute', bottom: 30}} title={'Logout'} onClick={() => {localStorage.clear(); history.push('/')}}/>
        </div>

         {/* //TODO: handle Loading
         // TODO: display booking id for each booking */}
         {/* load component */}
         {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: window.innerHeight, backgroundColor: 'rgb(244, 244, 244)' }}>
               <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
          </div> */}
      


        {/*screen excluding nav bar */}
        <div style={{display: 'flex', flexDirection: 'column', width: window.innerWidth-200, height: window.innerHeight, alignItems: 'center'}}>
            {/* page title */}
            <label style={{color:'#000000',fontFamily: 'Archivo Black', fontSize: 20}}> Your Reservations </label>
            {/* grey boxes */}
            {bookings.map((onebooking) =>{ 
              
              var flight=getFlight(onebooking.departFlightID);
            
              //var flightdep= departFlights;
              //var flightret= returnFlights;
              
              return(
              <div style={{width: '90%', height: 350, backgroundColor:'#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 150}}>
                 {/* text inside boxes */}
                <label style={{marginLeft:30,marginTop:200}}>
                   <label style={{color:'#000000',fontFamily:'Archivo Black', fontSize:20}}>Booking Number: {' '+ onebooking._id} <br/></label>
                   <label style={{color:'#000000', fontSize:20,marginLeft:30}}> PassengerCount:
                    {' '+ onebooking.PassengerCount}
                    <br/>
                    </label>
                   <label style={{color:'#000000',fontFamily:'Archivo Black', fontSize:20,marginLeft:30}}>Departure Flight Details:</label>
                   <br/>
                   <label style={{color:'#000000', fontSize:20,marginLeft:30}}> From:
                     {' '+(flight? flight.From: "NA") }
                    <br/>
                    </label>
                    <label style={{color:'#000000', fontSize:20,marginLeft:30}}> To:
                    {' '+ (flight? flight.To: "NA")}
                    <br/>
                    </label>
                    
                    <label style={{color:'#000000', fontSize:20,marginLeft:30}}> Departure Flight Seats:  
                    {' ' +  onebooking.departFlightSeats.join(', ')}
                    </label> 
                    <br/>

                    <label style={{color:'#000000',fontFamily:'Archivo Black', fontSize:20,marginLeft:30}}>Return Flight Details: </label>
                    <br/>
                     
                    <label style={{color:'#000000', fontSize:20,marginLeft:30}}> From:
                     {' '+(flight? flight.To: "NA") }
                    <br/>
                    </label>
                    <label style={{color:'#000000', fontSize:20,marginLeft:30}}> To:
                    {' '+ (flight? flight.To: "NA")}
                    <br/>
                    </label>
                    <label style={{color:'#000000', fontSize:20,marginLeft:30}}> Return Flight Seats:  
                    {' ' +  onebooking.returnFlightSeats.join(', ')}
                    </label>
                
                </label>
                <Button1
                 title={'Cancel Reservation'}
                 style={{width: 350,height: 50,marginLeft: 800,marginTop:10,marginBottom:70}}
                 onClick={() => { setCancelModal(true); setToDelete(onebooking._id); }}
                 />
                <label></label>
            </div>
            );
          }
            )}
        </div>

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