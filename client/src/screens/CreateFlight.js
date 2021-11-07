import React from 'react';
import styled from "styled-components";
import  {useState} from 'react';
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button1 from '../components/Button1';

function CreateFlight() {

  const history = useHistory();

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
    <Rect>
      <Image4Row style={{cursor: 'pointer'}} onClick={() => history.push('/admin')}>
          <Image4 src={require("../assets/images/logo3.png").default}></Image4>
          <DuneAirlines>DUNE</DuneAirlines>
      </Image4Row>
      <ProfileCard
        title={'Admin'}
      />
    </Rect>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 1100}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#AAA7A6', height: 980, borderRadius: 20, width: '50%', border:'2px solid #F0A500'}}>
        <text style={{fontFamily: 'Archivo Black', fontSize: 30, color: 'rgba(244,244,244,1)', marginTop: 0}}>CREATE FLIGHT</text>
        <label style={{marginTop: 30}}>From:</label>
        <input
            type='text'
            value={from}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setFrom(e.target.value)}
            required/>
          <label>To:</label>
        <input
            type='text'
            value={to}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setTo(e.target.value)}
            required/> 
           <label>Flight Date:</label>
        <input
            type='date'
            value={flightDate}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setFlightDate(e.target.value)}
            required/> 
           <label>Cabin:</label>
        <input
            type='text'
            value={cabin}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setCabin(e.target.value)}
            required /> 
           <label>Seats Available:</label>
        <input
            type='text'
            value={seats}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setSeats(e.target.value)}
           required />
           <label>Flight Number:</label>
           <input
            type='text'
            value={flightNumber}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setFlightNumber(e.target.value)}
           />
           <label>Airport Terminal:</label>
           <input
            type='text'
            value={airportTerminal}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setAirportTerminal(e.target.value)}
           />
           <label>Departure Time:</label>
           <input
            type='text'
            value={departureTime}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
            }}
            onChange={(e) => setDepartureTime(e.target.value)}
           />
           <label>Arrival Time:</label>
           <input
            type='text'
            value={arrivalTime}
            style={{
              height: 43,
              width: 192,
              marginTop: 7,
              borderRadius: 10
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
    </div>
    <Footer />
  </Container>
  )
 }

 const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect = styled.div`
  height: 100px;
  background-color: rgba(0,0,0,1);
  flex-direction: row;
  display: flex;
`;

const Image4 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-top: -10px;
`;

const DuneAirlines = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 30px;
  margin-left: 10px;
`;

const Image4Row = styled.div`
  height: 49px;
  flex-direction: row;
  display: flex;
  margin-right: 100px;
  margin-left: 50px;
  margin-top: 37px;
`;

export default CreateFlight;