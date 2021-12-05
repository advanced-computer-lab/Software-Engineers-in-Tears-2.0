import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import Button1 from "../components/Button1";
import Button3 from "../components/Button3";
import NormalHeader from "../components/NormalHeader";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';
import Button2 from "../components/Button2";
import { durationString } from "../Utils.js";

function UserSearch(props) {

  const history = useHistory();
  const [selectedDepDate, setselectedDepDate] = useState('');
  const [selectedReturnDate, setselectedReturnDate] = useState('');

  const [loading, setLoading] = useState(true);

  const [departFlights, setDepartFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [selectedDepart, setSelectedDepart] = useState('');
  const [selectedReturn, setSelectedReturn] = useState('');
  const [viewDepartDetailsID, setViewDepartDetailsID] = useState();
  const [viewReturnDetailsID, setViewReturnDetailsID] = useState();
  const [user, setUser] = useState({});
  const userID = localStorage.getItem("userID");

  const from = useState(props.match.params.from)[0];
  const to = useState(props.match.params.to)[0];
  const cabin = useState(props.match.params.cabin === 'null' ? null : props.match.params.cabin)[0];
  const fromDate = useState(props.match.params.fromDate === 'null' ? null : props.match.params.fromDate)[0];
  const toDate = useState(props.match.params.toDate === 'null' ? null : props.match.params.toDate)[0];

  useEffect(() => {
    setLoading(true)
    if (userID) {
      axios.post('http://localhost:8000/getUserByID/', { _id: userID })
        .then(res => {
          setUser(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        })
    }
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
  }, [cabin, from, fromDate, props.match.params.pcount, to, toDate, userID]);

  return (
    <Container >
      {userID ? <ProfileHeader title={user.First_Name} path={'/'} /> : <NormalHeader />}
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
        <div style={{ height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50}}>               
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black' }}>From</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 150 }}>To</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 250}}>Flight Date</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 400 }}>Cabin</label>
          </div>
        {departFlights.map((flight) => {
          if(selectedReturnDate !== '' && new Date(flight.Flight_Date).getTime()>new Date(selectedReturnDate).getTime()){
            return null;
          }
          return(
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{ height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50}}>               
              <label style={{ textAlign: 'center', fontFamily: 'Archivo' }}>{flight.From}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 150 }}>{flight.To}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 250}}>{flight.Flight_Date!=null?flight.Flight_Date.substring(0,10):null}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 400 }}>{flight.Cabin}</label>
              <Button1 title={'View Details'} style={{ width: 160, height: 35, position: 'absolute', right: 230  }} onClick={() => viewDepartDetailsID === flight._id ? setViewDepartDetailsID('') : (setViewDepartDetailsID(flight._id))} />
              {selectedDepart === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50 }} onClick={()=>{setSelectedDepart('');setselectedDepDate(''); }} /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50  }}  onClick={() => {setSelectedDepart(flight._id); setselectedDepDate(flight.Flight_Date)}}/>}
            </div>
            {viewDepartDetailsID != null && viewDepartDetailsID===flight._id ? 
                <div style={{height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <label style={{fontFamily: 'Archivo'}}>Flight Number:{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Depart time: {flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Arrival time: {flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Trip duration:  {durationString(flight.Trip_Duration)}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Baggage Allowance: {flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Price: ${flight.Price?flight.Price:'N/A'}</label>
                </div>
              : null}
          </div>
        );})}
        <div style={{height: 70, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
        <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25}}>Choose Return Flight</label>
      </div>
      <div style={{ height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50}}>               
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black' }}>From</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 150 }}>To</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 250}}>Flight Date</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 400 }}>Cabin</label>
          </div>
        {returnFlights.map((flight) => {
          if(selectedDepDate !== '' && new Date(flight.Flight_Date).getTime()<new Date(selectedDepDate).getTime()){
            return null;
          }
          return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{ height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50}}>               
              <label style={{ textAlign: 'center', fontFamily: 'Archivo' }}>{flight.From}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 150 }}>{flight.To}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 250}}>{flight.Flight_Date!=null?flight.Flight_Date.substring(0,10):null}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 400 }}>{flight.Cabin}</label>
              <Button1 title={'View Details'} style={{ width: 160, height: 35, position: 'absolute', right: 230  }} onClick={() => viewReturnDetailsID === flight._id ? setViewReturnDetailsID('') : (setViewReturnDetailsID(flight._id))} />
              {selectedReturn === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50 }} onClick={()=>{setSelectedReturn(''); setselectedReturnDate(''); }} /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50  }}  onClick={() => {setSelectedReturn(flight._id);setselectedReturnDate(flight.Flight_Date)}}/>}
            </div>
            {viewReturnDetailsID != null && viewReturnDetailsID===flight._id ? 
                <div style={{height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <label style={{fontFamily: 'Archivo'}}>Flight Number:{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Depart time: {flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Arrival time: {flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Trip duration:  {durationString(flight.Trip_Duration)}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Baggage Allowance: {flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Price: ${flight.Price?flight.Price:'N/A'}</label>
                </div>
              : null}
          </div>
        );})}
        <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: -35}}>
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
