import React from 'react';
import styled from "styled-components";
import  {useState} from 'react';
import ProfileHeader from "../components/ProfileHeader";
import Footer from "../components/Footer";
import axios from 'axios';
import Button1 from '../components/Button1';

function CreateFlight() {

  const[from, setFrom] = useState('');
  const[to, setTo] = useState('');
  const[flightDate, setFlightDate] = useState('');
  const[cabin, setCabin] = useState('');
  const[seats, setSeats] = useState('');
  const[flightNumber, setFlightNumber] = useState('');
  const[airportTerminal, setAirportTerminal] = useState('');
  const[departureTime, setDepartureTime] = useState('');
  const[arrivalTime, setArrivalTime] = useState('');


  const[created, setCreated] = useState(false);
  const[error, setError] = useState(false);

  function create(event){
   event.preventDefault();
    if(from === '' | to === '' | flightDate === ''  | cabin === '' | seats === '' ){
      setError(true)
      setCreated(false)
    }
    else{
      setError(false)
      const newFlight={
        From:from,
        To:to,
        Flight_Date:flightDate,
        Cabin:cabin,
        Seats_Available_on_Flight:seats,
        FlightNumber: flightNumber,
        AirportTerminal: airportTerminal,
        DepartureTime: departureTime,
        ArrivalTime: arrivalTime
      }
       axios.post('http://localhost:8000/admincreateflights',newFlight).then(res => {
         console.log(res.data)
       })
       .catch(err =>{
         console.log(err);
       })
       setCreated(true);
       setCabin('')
       setTo('')
       setFlightDate('')
       setFrom('')
       setSeats('')
       setAirportTerminal('')
       setArrivalTime('')
       setDepartureTime('')
       setFlightNumber('')
    } 
   
  }
  
  
  return (
    <Container>
    <ProfileHeader title={'Admin'} path={'/admin'}/>
    <div style={{height: 80, backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <text style={{fontFamily: 'Archivo Black', color: '#f4f4f4', fontSize: 30, marginLeft: 50}}>Create Flight</text>
    </div>
      <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
        <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>From: <label style={{color: '#F0A500'}}>*</label></label>
        <input
            type='text'
            value={from}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setFrom(e.target.value)}
            required/>
          <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>To: <label style={{color: '#F0A500'}}>*</label></label>
        <input
            type='text'
            value={to}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setTo(e.target.value)}
            required/> 
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Flight Date: <label style={{color: '#F0A500'}}>*</label></label>
        <input
            type='date'
            value={flightDate}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setFlightDate(e.target.value)}
            required/> 
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Cabin: <label style={{color: '#F0A500'}}>*</label></label>
        <input
            type='text'
            value={cabin}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setCabin(e.target.value)}
            required /> 
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Seats Available: <label style={{color: '#F0A500'}}>*</label></label>
        <input
            type='number'
            value={seats}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setSeats(e.target.value)}
           required />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Flight Number:</label>
           <input
            type='text'
            value={flightNumber}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setFlightNumber(e.target.value)}
           />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Airport Terminal:</label>
           <input
            type='text'
            value={airportTerminal}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setAirportTerminal(e.target.value)}
           />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Departure Time:</label>
           <input
            type='text'
            value={departureTime}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setDepartureTime(e.target.value)}
           />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Arrival Time:</label>
           <input
            type='text'
            value={arrivalTime}
            style={{
              height: 39,
              borderRadius: 4,
              width: 300,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.03)'
            }}
            onChange={(e) => setArrivalTime(e.target.value)}
           />
           <Button1 
            style={{
              width: 200,
              height: 50,
              marginTop: 30
            }}
            title={'Create'}
            onClick={create}
           /> 
          {created ? <text style={{fontFamily: 'Archivo', color: '#047305', marginTop: 40, fontSize: 20}}>Flight successfully created!</text> : null}
          {error ? <text style={{fontFamily: 'Archivo', color: '#DD1111', marginTop: 40, fontSize: 20}}>Please fill in all the details!</text> : null}
      </div>  
    <Footer />
  </Container>
  )
 }

 const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CreateFlight;