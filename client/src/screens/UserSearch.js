import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button4 from "../components/Button4";
import Modal from 'react-bootstrap/Modal';
import Button1 from "../components/Button1";
import Button3 from "../components/Button3";
import NormalHeader from "../components/NormalHeader";
import Footer from "../components/Footer";


function UserSearch(props) {

  const history = useHistory();
  const [departflights, setDepartFlights] = useState([]);
  const [returnflights, setReturnFlights] = useState([]);
  const [selectedDepart, setSelectedDepart] = useState();
  const [viewdetailsid, setViewDetailsid] = useState();



  useEffect(() => {
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
      axios
        .post('http://localhost:8000/adminsearchflights', departFlightData)
        .then(res => {
            const arr = res.data;
            for(let i=0;i<arr.length;i++){
               if(props.location.flightData.PassengerCount>(arr[i].Seats_Available_on_Flight-arr[i].SeatsBooked.length)){
                  console.log(props.location.flightData.PassengerCount);
                  console.log(arr[i].Seats_Available_on_Flight);
                  console.log(arr[i].SeatsBooked.length);
                   arr.splice(i, 1)
                   i--;
               }
            }
            setDepartFlights(arr)
        })
        .catch(err => {
          console.log(err);
        })
        axios
        .post('http://localhost:8000/adminsearchflights', returnFlightData)
        .then(res => {
            setReturnFlights(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    
  }, []);

  return (
    
      <Container >
      <NormalHeader />
      <div style={{height: 70, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)'}}>
        <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25, marginLeft: 50}}>Choose Depart Flight</label>
      </div>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Flight Date</th>
              <th>Cabin</th>
              <th>Seats Available</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {departflights.map((flight) => (
              <tr style={{ height: 50 }}>
                <td style={{ textAlign: 'center' }}>{flight.From}</td>
                <td style={{ textAlign: 'center' }}>{flight.To}</td>
                <td style={{ textAlign: 'center' }}>{flight.Flight_Date!=null?flight.Flight_Date.substring(0,10):null}</td>
                <td style={{ textAlign: 'center' }}>{flight.Cabin}</td>
                <td style={{ textAlign: 'center' }}>{flight.Seats_Available_on_Flight}</td>
                <td style={{ display: 'flex', marginLeft: 70, marginTop: 8 }}><Button1 title={'View Details'} style={{ width: 160, height: 35 }} onClick={() => setViewDetailsid(flight._id)} /></td>
                <td>{selectedDepart === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35 }}  /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35 }}  onClick={() => setSelectedDepart(flight._id)}/>}</td>
                {viewdetailsid != null && viewdetailsid===flight._id ? 
                <div style={{height: 60, width: '100%', display: 'flex'}}>
                    <label>{flight.From}</label>
                    <label>{flight.To}</label>
                    <label>{flight.DepartureTime}</label>
                    <label>{flight.ArrivalTime}</label>
                    <label>{flight.Cabin}</label>
                    <label>{flight.Baggage_Allowance}</label>

                </div>
                : null}
              </tr>
              
            ))}
          </tbody>
        </table>
        <div style={{height: 70, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
        <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25, marginLeft: 50}}>Choose Return Flight</label>
      </div>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Flight Date</th>
              <th>Cabin</th>
              <th>Seats Available</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {returnflights.map((flight) => (
              <tr style={{ height: 50 }}>
                <td style={{ textAlign: 'center' }}>{flight.From}</td>
                <td style={{ textAlign: 'center' }}>{flight.To}</td>
                <td style={{ textAlign: 'center' }}>{flight.Flight_Date!=null?flight.Flight_Date.substring(0,10):null}</td>
                <td style={{ textAlign: 'center' }}>{flight.Cabin}</td>
                <td style={{ textAlign: 'center' }}>{flight.Seats_Available_on_Flight}</td>
                <td style={{ display: 'flex', marginLeft: 70, marginTop: 8 }}><Button1 title={'View Details'} style={{ width: 160, height: 35 }} /></td>
                <td><Button1 title={'Select Flight'} style={{ width: 160, height: 35 }}  /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Footer/>
      </Container>
    
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UserSearch;
