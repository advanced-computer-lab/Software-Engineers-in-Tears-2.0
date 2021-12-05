import React, { Component } from 'react';
import styled from "styled-components";
import  {useState} from 'react';
import ProfileHeader from "../components/ProfileHeader";
import Footer from "../components/Footer";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button1 from '../components/Button1';
import { durationString } from "../Utils.js";


  

function CreateFlight() {

  const[from, setFrom] = useState('');
  const[to, setTo] = useState('');
  const[flightDate, setFlightDate] = useState('');
  const[arrivalDate, setArrivalDate] = useState('');
  const[cabin, setCabin] = useState('');
  const[seats, setSeats] = useState('');
  const[flightNumber, setFlightNumber] = useState('');
  const[airportTerminal, setAirportTerminal] = useState('');
  const[departureTime, setDepartureTime] = useState('');
  const[arrivalTime, setArrivalTime] = useState('');
  const[baggage, setBaggage] = useState('');
  const[price, setPrice] = useState('');
  const[duration, setDuration] = useState('');


  const[created, setCreated] = useState(false);
  const[error, setError] = useState(false);
  const[timeerror, setTimeError] = useState(false);
  const[time1formaterror, setTime1FormatError] = useState(false);
  const[time2formaterror, setTime2FormatError] = useState(false);
  const[dateerror, setDateError] = useState(false);

 
  function create(event){
   event.preventDefault();

   var isValidDep =  /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(departureTime);
   var isValidReturn = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(arrivalTime);
   var d1=new Date(flightDate+"T"+departureTime);
   var d2=new Date(arrivalDate+"T"+arrivalTime);
   var duration= d2.getTime()-d1.getTime();

   var f = new Date(flightDate)
   var t = new Date(arrivalDate)
   

    if(from === '' | to === '' | flightDate === ''  | cabin === '' | seats === ''|arrivalTime===''|departureTime===''|seats===''|airportTerminal==='' |arrivalDate===''|baggage===''|price===''){
      setError(true);
      setCreated(false);
      setTime2FormatError(false);
      setTimeError(false);
      setTime1FormatError(false);
      setDateError(false);
    }
    else if(isValidDep===false){
     
      setTime2FormatError(false);
      setTime1FormatError(true);
      setCreated(false);
      setError(false);
      setTimeError(false);
      setDateError(false);
     
    }
    else if(isValidReturn===false){
      setTime1FormatError(false);
      console.log("not valid ret");
     setTime2FormatError(true);
     setCreated(false);
     setError(false);
     setTimeError(false);
     setDateError(false);
    }
    
    else if((new Date(flightDate).getTime()===new Date(arrivalDate).getTime())&&departureTime>arrivalTime){
      console.log("yes");
      setTimeError(true);
      setTime1FormatError(false);
      setTime2FormatError(false);
      setCreated(false);
      setError(false);
      setDateError(false);

    }
    else if(f.getTime()>t.getTime()){
    setDateError(true);
    setTimeError(false);
      setTime1FormatError(false);
      setTime2FormatError(false);
      setCreated(false);
      setError(false);
    }
    else{
      setTimeError(false);
      setTime1FormatError(false);
      setTime2FormatError(false);
      setError(false);
      setDateError(false);
      const newFlight={
        From:from,
        To:to,
        Flight_Date:flightDate,
        Arrival_Date:arrivalDate,
        Cabin:cabin,
        Seats_Available_on_Flight:seats,
        FlightNumber: flightNumber,
        AirportTerminal: airportTerminal,
        DepartureTime: departureTime,
        ArrivalTime: arrivalTime,
        Price:price,
        Baggage_Allowance:baggage,
        Trip_Duration: duration
      
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
       setArrivalDate('')
       setFrom('')
       setSeats('')
       setAirportTerminal('')
       setArrivalTime('')
       setDepartureTime('')
       setFlightNumber('')
       setBaggage('')
       setPrice('')
    } 
   
  }
  
  
  return (
    
    <Container>
    <ProfileHeader title={'Admin'} path={'/admin'}/>
    <div style={{height: 80, backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <text style={{fontFamily: 'Archivo Black', color: '#f4f4f4', fontSize: 30, marginLeft: 50}}>Create Flight</text>
    </div>
    <form name="updateflight" id="updateflight" style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }} >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
           
              <Div1 id="d1">
      
        <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>From: <label style={{color: '#F0A500'}}>*</label></label>
        <Input
            type='text'
            value={from}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setFrom(e.target.value)}
            required/>
          <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>To: <label style={{color: '#F0A500'}}>*</label></label>
        <Input
            type='text'
            value={to}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setTo(e.target.value)}
            required/> 
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Departure Date: <label style={{color: '#F0A500'}}>*</label></label>
        <Input
            type='date'
            value={flightDate}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setFlightDate(e.target.value)}
            required/> 
            <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Arrival Date: <label style={{color: '#F0A500'}}>*</label></label>
        <Input
            type='date'
            value={arrivalDate}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setArrivalDate(e.target.value)}
            required/> 
            
             
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Cabin: <label style={{color: '#F0A500'}}>*</label></label>
        <Input
            type='text'
            value={cabin}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setCabin(e.target.value)}
            required /> 
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Seats Available: <label style={{color: '#F0A500'}}>*</label></label>
        <Input
            type='number'
            value={seats}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setSeats(e.target.value)}
           required /> 
            </Div1>
            <Div1 id="d2">
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Flight Number: <label style={{color: '#F0A500'}}>*</label></label>
           <Input
            type='text'
            value={flightNumber}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setFlightNumber(e.target.value)}
           />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Airport Terminal: <label style={{color: '#F0A500'}}>*</label></label>
           <Input
            type='text'
            value={airportTerminal}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setAirportTerminal(e.target.value)}
           />
            
          
            
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Departure Time: <label style={{color: '#F0A500'}}>*</label></label>
           <Input
            type='text'
            value={departureTime}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) => setDepartureTime(e.target.value)}
           />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Arrival Time: <label style={{color: '#F0A500'}}>*</label></label>
           <Input
            type='text'
            value={arrivalTime}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) =>setArrivalTime(e.target.value)}
           />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Baggage Allowance: <label style={{color: '#F0A500'}}>*</label></label>
           <Input
            type='text'
            value={baggage}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) =>setBaggage(e.target.value)}
           />
           <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Price: <label style={{color: '#F0A500'}}>*</label></label>
           <Input
            type='text'
            value={price}
            style={{
              height: 39,
              borderRadius: 4,
              width: 200,
              marginTop: 7,
              borderBottom: '2px solid #F0A500',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              backgroundColor: 'rgba(0,0,0,0.08)'
            }}
            onChange={(e) =>setPrice(e.target.value)}
           />
           <div style={{ display: 'flex',flexDirection:'column ', marginRight: '0px' }}>
           {error ? <text style={{fontFamily: 'Archivo', color: '#DD1111', marginTop: 40, fontSize: 20,alignItems: 'center'}}>Please fill in all the details!</text> : null}
          {timeerror ? <text style={{fontFamily: 'Archivo', color: '#DD1111', marginTop: 40, fontSize: 20,alignItems: 'center',marginLeft: '-100px'}}>Your Departure time is after your Arrival time!</text> : null}
          {time1formaterror ? <text style={{fontFamily: 'Archivo', color: '#DD1111', marginTop: 40, fontSize: 20,alignItems: 'center',marginLeft: '-100px'}}>Please enter correct departure time format : hh:mm:ss!</text> : null}
          {time2formaterror ? <text style={{fontFamily: 'Archivo', color: '#DD1111', marginTop: 40, fontSize: 20,alignItems: 'center',marginLeft: '-100px'}}>Please enter correct arrival time format : hh:mm:ss!</text> : null}
          {dateerror ? <text style={{fontFamily: 'Archivo', color: '#DD1111', marginTop: 40, fontSize: 20,alignItems: 'center',marginLeft: '-100px'}}>Your departure date is after your arrival date!</text> : null}
          {created ? <text style={{fontFamily: 'Archivo', color: '#047305', marginTop: 40, fontSize: 20}}>Flight successfully created!</text> : null}

           <Button1 
            style={{
              width: 200,
              height: 50,
              marginTop: 0,
              marginRight: 380
            }}
            title={'Create'}
            onClick={create}
/>          
           </div>
           </Div1>
           
           
           
            </div>  </form>
          

     
    <Footer />
  </Container>
  )
 }

 
const Container = styled.div`
  display: flex;
  background-color: rgba(244,244,244,1);
  flex-direction: column;
`;

const Input = styled.input`
  height: 39px;
  width: 300px;
  border-top: none;
  border-right: none;
  border-left: none;
  margin-bottom: 40px;
  background: rgba(0,0,0,0.03);
  border-bottom: 2px solid #F0A500;
  font-size: 15px;
`;

const Div1 = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default CreateFlight;