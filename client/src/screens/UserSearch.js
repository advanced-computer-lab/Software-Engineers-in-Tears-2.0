import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button1 from "../components/Button1";
import Button3 from "../components/Button3";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';
import Button2 from "../components/Button2";
import Header from '../components/Header'
import { durationString } from "../Utils.js";
import Background from '../assets/images/cloud22.jpg';

function UserSearch(props) {

  const history = useHistory();
  const [selectedDepDate, setselectedDepDate] = useState('');
  const [selectedReturnDate, setselectedReturnDate] = useState('');

  const [loading, setLoading] = useState(true);

  const [departFlights, setDepartFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [selectedDepart, setSelectedDepart] = useState('');
  const [selectedReturn, setSelectedReturn] = useState('');
  const [firstName, setFirstName] = useState('');

  const from = useState(props.match.params.from)[0];
  const to = useState(props.match.params.to)[0];
  const cabin = useState(props.match.params.cabin === 'null' ? null : props.match.params.cabin)[0];
  const fromDate = useState(props.match.params.fromDate === 'null' ? null : props.match.params.fromDate)[0];
  const toDate = useState(props.match.params.toDate === 'null' ? null : props.match.params.toDate)[0];

  useEffect(() => {
    setLoading(true)
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(!res.data.isLoggedIn){
          localStorage.clear();
        }
        else if(res.data.Type === 'administrator'){
          history.push('/admin')
        }
        else{
          setFirstName(localStorage.getItem('firstName'))
        }
      })
      .catch(err => {
        console.log(err);
      })
    axios.post('http://localhost:8000/adminsearchflights', {
      From: from,
      To: to,
      Cabin: cabin,
      Flight_Date: fromDate
    })
      .then(res => {
        const arr = res.data;
        for (let i = 0; i < arr.length; i++) {
          if (props.match.params.pcount > (arr[i].Seats_Available_on_Flight - arr[i].SeatsBooked.length)) {
            arr.splice(i, 1);
            i--;
          }
        }
        setDepartFlights(arr);
      })
      .catch(err => {
        console.log(err);
      })
    axios.post('http://localhost:8000/adminsearchflights', {
      From: to,
      To: from,
      Cabin: cabin,
      Flight_Date: toDate
    })
      .then(res => {
        const arr = res.data;
        for (let i = 0; i < arr.length; i++) {
          if (props.match.params.pcount > (arr[i].Seats_Available_on_Flight - arr[i].SeatsBooked.length)) {
            arr.splice(i, 1);
            i--;
          }
        }
        setReturnFlights(arr);
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  }, [cabin, from, fromDate, history, props.match.params.pcount, to, toDate]);

  return (
    <Container >
      <Header title={firstName}/>
      {
        loading ?
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: '#fff' }}>
            <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
        </div> 
        :
        (departFlights.length === 0 || returnFlights.length === 0 ? 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: window.innerHeight-160, backgroundColor: '#fff'}}>
              <Image src={require("../assets/images/error-icon.png").default} style={{width: 100, height: 100}}/>
              <label style={{fontFamily: 'Archivo Black', fontSize: 30, color:'#F0A500'}}>No Results</label>
              <label style={{fontFamily: 'Archivo', fontSize: 20, color:'#000', marginTop: 20}}>Modify your search criteria and try again.</label>
              <Button2 style={{width: 200, height: 50, marginTop: 20}} title={'Back to Home Screen'} onClick={() => history.push('/')}/>
          </div>
          :
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={{height: 70, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)'}}>
          <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25}}>Choose Depart Flight</label>
        </div>
       
        {departFlights.map((flight) => {
          if(selectedReturnDate !== '' && new Date(flight.Flight_Date).getTime()>new Date(selectedReturnDate).getTime()){
            return null;
          }
          return(
            <div style={{height: 90, width: '95%', backgroundColor: '#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 30, marginBottom: 20, display: 'flex', flexDirection: 'row', backgroundImage: "url(" + Background + ")", alignItems: 'center', alignSelf: 'center'}}>
              <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft: 10}}>{flight.From}</label>
              <Image src={require("../assets/images/plane.png").default} style={{height: 30, width: 30, marginLeft: 10}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:10}}>{flight.To}</label>
              <Image src={require("../assets/images/cabin.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 20}}>{flight.Cabin}</label>
              <Image src={require("../assets/images/cal.png").default} style={{height: 20, width: 20, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo', fontSize:20, marginLeft:5}}>{flight.Flight_Date?(flight.Flight_Date.substring(0,10)):'N/A'}</label>
              <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:20}}>#{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
              <Image src={require("../assets/images/lug5.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo'}}>{flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}Kg</label>
              <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}><label style={{fontWeight:'bold'}}>$</label>{flight.Price?flight.Price:'N/A'}</label>
              <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}>{flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
              <Image src={require("../assets/images/line2.png").default} style={{height: 25, width: 30, marginLeft:10}}/>
              <label style={{fontFamily: 'Archivo', marginLeft:10, fontSize: 20}}>{flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
              <Image src={require("../assets/images/dur2.jpg").default} style={{height: 30, width: 30, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 20}}>{durationString(flight.Trip_Duration)}</label>
              {selectedDepart === flight._id ? <Button3 title={'Select Flight'} style={{width: 160, height: 35, marginLeft: 'auto', marginRight: 20}} onClick={()=>{setSelectedDepart(''); setselectedDepDate(''); }} /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, marginLeft: 'auto', marginRight: 20}}  onClick={() => {setSelectedDepart(flight._id);setselectedDepDate(flight.Flight_Date)}}/>}
            </div>
        );})}
        <div style={{height: 70, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
        <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25}}>Choose Return Flight</label>
      </div>
     
        {returnFlights.map((flight) => {
          if(selectedDepDate !== '' && new Date(flight.Flight_Date).getTime()<new Date(selectedDepDate).getTime()){
            return null;
          }
          return (
            <div style={{height: 90, width: '95%', backgroundColor: '#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 30, marginBottom: 20, display: 'flex', flexDirection: 'row', backgroundImage: "url(" + Background + ")", alignItems: 'center', alignSelf: 'center'}}>
              <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft: 10}}>{flight.From}</label>
              <Image src={require("../assets/images/plane.png").default} style={{height: 30, width: 30, marginLeft: 10}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:10}}>{flight.To}</label>
              <Image src={require("../assets/images/cabin.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 20}}>{flight.Cabin}</label>
              <Image src={require("../assets/images/cal.png").default} style={{height: 20, width: 20, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo', fontSize:20, marginLeft:5}}>{flight.Flight_Date?(flight.Flight_Date.substring(0,10)):'N/A'}</label>
              <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:20}}>#{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
              <Image src={require("../assets/images/lug5.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo'}}>{flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}Kg</label>
              <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}><label style={{fontWeight:'bold'}}>$</label>{flight.Price?flight.Price:'N/A'}</label>
              <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}>{flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
              <Image src={require("../assets/images/line2.png").default} style={{height: 25, width: 30, marginLeft:10}}/>
              <label style={{fontFamily: 'Archivo', marginLeft:10, fontSize: 20}}>{flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
              <Image src={require("../assets/images/dur2.jpg").default} style={{height: 30, width: 30, marginLeft: 20}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 20}}>{durationString(flight.Trip_Duration)}</label>
              {selectedReturn === flight._id ? <Button3 title={'Select Flight'} style={{width: 160, height: 35, marginLeft: 'auto', marginRight: 20}} onClick={()=>{setSelectedReturn(''); setselectedReturnDate(''); }} /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, marginLeft: 'auto', marginRight: 20}}  onClick={() => {setSelectedReturn(flight._id);setselectedReturnDate(flight.Flight_Date)}}/>}
            </div>
        );})}
        <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', marginBottom: -35, alignItems: 'center'}}>
          <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Round Trip Flight: <label style={{fontFamily: 'Archivo Black', color: '#F0A500'}}>{ props.match.params.from} - {props.match.params.to}</label></label>
          <Button1 disabled={selectedDepart === '' || selectedReturn === ''} onClick={() => history.push(`/summary/${selectedDepart}/${selectedReturn}/${props.match.params.pcount}`)} title={'Confirm Selection'} style={{fontSize: 20, position: 'absolute', right: 50, width: 180, height: 40}}/>
        </div>
        </div>
        )
      }
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
`;

export default UserSearch;
