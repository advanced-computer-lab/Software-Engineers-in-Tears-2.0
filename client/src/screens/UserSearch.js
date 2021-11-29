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


function UserSearch(props) {

  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [departflights, setDepartFlights] = useState([]);
  const [returnflights, setReturnFlights] = useState([]);
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
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
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
                <td style={{ display: 'flex', marginLeft: 70, marginTop: 8 }}><Button1 title={'View Details'} style={{ width: 160, height: 35 }} onClick={() => setViewDepartDetailsID(flight._id)} /></td>
                <td>{selectedDepart === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35 }}  /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35 }}  onClick={() => setSelectedDepart(flight._id)}/>}</td>
                {viewDepartDetailsID != null && viewDepartDetailsID===flight._id ? 
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
                <td style={{ display: 'flex', marginLeft: 70, marginTop: 8 }}><Button1 title={'View Details'} style={{ width: 160, height: 35 }} onClick={() => setViewReturnDetailsID(flight._id)}/></td>
                <td>{selectedReturn === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35 }}  /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35 }}  onClick={() => setSelectedReturn(flight._id)}/>}</td>
                {viewReturnDetailsID != null && viewReturnDetailsID===flight._id ? 
                <div style={{height: 60, width: '100%', display: 'flex'}}>
                    <label>Number:{flight.FlightNumber}</label>
                    <label>From:{flight.From}</label><br></br>
                    <label>To:{flight.To}</label><br></br>
                    <label>Depart time:{flight.DepartureTime}</label><br></br>
                    <label>Arrival time:{flight.ArrivalTime}</label><br></br>
                    <label>Cabin class:{flight.Cabin}</label><br></br>
                    <label>Baggage Allowance:{flight.Baggage_Allowance}</label><br></br>
                    <label>Trip duration:{flight.Trip_Duration}</label><br></br>
                    <label>Price:{flight.Price}</label><br></br>
                </div>
                : null}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      }
        <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: -35, marginTop: 30}}>
          <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Booking Total: <label style={{fontFamily: 'Archivo Black', color: '#F0A500'}}></label></label>
          <Button1 disabled={selectedDepart === '' || selectedReturn === ''} onClick={() => history.push(`/summary/${selectedDepart}/${selectedReturn}/${props.location.flightData.PassengerCount}`)} title={'Confirm Selection'} style={{fontSize: 20, position: 'absolute', right: 50, width: 180, height: 40}}/>
        </div>
        <Footer/>
      </Container>   
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UserSearch;
