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


function UserSearch(props) {

  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [departFlights, setDepartFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [selectedDepart, setSelectedDepart] = useState('');
  const [selectedReturn, setSelectedReturn] = useState('');
  const [viewDepartDetailsID, setViewDepartDetailsID] = useState();
  const [viewReturnDetailsID, setViewReturnDetailsID] = useState();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const userID = localStorage.getItem("userID");

  useEffect(() => {
      setLoading(true)
      const departFlightData = {
        From: props.location.flightData.From, 
        To: props.location.flightData.To,
        Cabin:props.location.flightData.Cabin,
        Flight_Date:props.location.flightData.FromDate,
      }
      const returnFlightData = {
        From: props.location.flightData.To, 
        To: props.location.flightData.From,
        Cabin:props.location.flightData.Cabin,
        Flight_Date:props.location.flightData.ToDate,
      }
      if(userID){
        axios.post('http://localhost:8000/getUserByID/', {_id: userID})
        .then(res => {
          setLogged(true)
          setUser(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        })
      }
      axios.post('http://localhost:8000/adminsearchflights', departFlightData)
        .then(res => {
            const arr = res.data;
            for(let i=0;i<arr.length;i++){
               if(props.location.flightData.PassengerCount>(arr[i].Seats_Available_on_Flight-arr[i].SeatsBooked.length)){
                   arr.splice(i, 1);
                   i--;
               }
            }
            setDepartFlights(arr);
        })
        .catch(err => {
          console.log(err);
        })
      axios.post('http://localhost:8000/adminsearchflights', returnFlightData)
        .then(res => {
          const arr = res.data;
            for(let i=0;i<arr.length;i++){
               if(props.location.flightData.PassengerCount>(arr[i].Seats_Available_on_Flight-arr[i].SeatsBooked.length)){                  
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
  }, [props.location.flightData.Cabin, props.location.flightData.From, props.location.flightData.FromDate, props.location.flightData.PassengerCount, props.location.flightData.To, props.location.flightData.ToDate, userID]);

  return (
      <Container >
      {logged ? <ProfileHeader title={user.First_Name} path={'/'}/> : <NormalHeader />}
      {
        loading ?
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: '#fff'}}>
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
        {departFlights.map((flight) => (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{ height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50}}>               
              <label style={{ textAlign: 'center', fontFamily: 'Archivo' }}>{flight.From}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 150 }}>{flight.To}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 250}}>{flight.Flight_Date!=null?flight.Flight_Date.substring(0,10):null}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 400 }}>{flight.Cabin}</label>
              <Button1 title={'View Details'} style={{ width: 160, height: 35, position: 'absolute', right: 230  }} onClick={() => viewDepartDetailsID === flight._id ? setViewDepartDetailsID('') : (setViewDepartDetailsID(flight._id))} />
              {selectedDepart === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50 }}  /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50  }}  onClick={() => setSelectedDepart(flight._id)}/>}
            </div>
            {viewDepartDetailsID != null && viewDepartDetailsID===flight._id ? 
                <div style={{height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <label style={{fontFamily: 'Archivo'}}>Flight Number:{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Depart time: {flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Arrival time: {flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Trip duration: {flight.Trip_Duration?flight.Trip_Duration:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Baggage Allowance: {flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Price: ${flight.Price?flight.Price:'N/A'}</label>
                </div>
              : null}
          </div>
            ))}
        <div style={{height: 70, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
        <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25}}>Choose Return Flight</label>
      </div>
      <div style={{ height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50}}>               
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black' }}>From</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 150 }}>To</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 250}}>Flight Date</label>
            <label style={{ textAlign: 'center', fontFamily: 'Archivo Black', position: 'absolute', left: 400 }}>Cabin</label>
          </div>
        {returnFlights.map((flight) => (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{ height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50}}>               
              <label style={{ textAlign: 'center', fontFamily: 'Archivo' }}>{flight.From}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 150 }}>{flight.To}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 250}}>{flight.Flight_Date!=null?flight.Flight_Date.substring(0,10):null}</label>
              <label style={{ textAlign: 'center', fontFamily: 'Archivo', position: 'absolute', left: 400 }}>{flight.Cabin}</label>
              <Button1 title={'View Details'} style={{ width: 160, height: 35, position: 'absolute', right: 230  }} onClick={() => viewReturnDetailsID === flight._id ? setViewReturnDetailsID('') : (setViewReturnDetailsID(flight._id))} />
              {selectedReturn === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50 }}  /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50  }}  onClick={() => setSelectedReturn(flight._id)}/>}
            </div>
            {viewReturnDetailsID != null && viewReturnDetailsID===flight._id ? 
                <div style={{height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <label style={{fontFamily: 'Archivo'}}>Flight Number:{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Depart time: {flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Arrival time: {flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Trip duration: {flight.Trip_Duration?flight.Trip_Duration:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Baggage Allowance: {flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}</label>
                    <label style={{fontFamily: 'Archivo', marginLeft: 50}}>Price: ${flight.Price?flight.Price:'N/A'}</label>
                </div>
              : null}
          </div>
            ))}
        <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: -35}}>
          <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Round Trip Flight: <label style={{fontFamily: 'Archivo Black', color: '#F0A500'}}>{props.location.flightData.From} - {props.location.flightData.To}</label></label>
          <Button1 disabled={selectedDepart === '' || selectedReturn === ''} onClick={() => history.push(`/summary/${selectedDepart}/${selectedReturn}/${props.location.flightData.PassengerCount}`)} title={'Confirm Selection'} style={{fontSize: 20, position: 'absolute', right: 50, width: 180, height: 40}}/>
        </div>
        </div>
        )
      }
        <Footer/>
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
