import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Button3 from "../components/Button3";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';
import Header from '../components/Header'
import { durationString } from "../Utils.js";
import Background from '../assets/images/cloud22.jpg';

function ModifyReturnBookingResults(props) {

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);

    const [returnFlights, setReturnFlights] = useState([]);
    const [selectedReturn, setSelectedReturn] = useState('');
    const [viewReturnDetailsID, setViewReturnDetailsID] = useState();
  
    const [firstName, setFirstName] = useState('');
  
    const from = useState(props.match.params.from)[0];
    const to = useState(props.match.params.to)[0];
    const cabin = useState(props.match.params.cabin === 'null' ? null : props.match.params.cabin)[0];
    const fromDate = useState(props.match.params.fromDate === 'null' ? null : props.match.params.fromDate)[0];
  
    useEffect(() => {
      setLoading(true)
      axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
        .then(res => {
          if(!res.data.isLoggedIn){
            localStorage.clear();
            history.push('/')
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
          setReturnFlights(arr);
          setLoading(false)
        })
        .catch(err => {
          console.log(err);
        })
      
    }, [cabin, from, fromDate, history, props.match.params.pcount, to]);

    const handle =  async() => {
      setLoading2(true)
      const res = await axios.post('http://localhost:8000/adminsearchflights/', {_id: props.location.ReturnFlight._id})
      const arr = res.data[0].SeatsBooked;
      console.log(arr);
      console.log(props.location.Booking.returnFlightSeats)
      for(let i = 0; i < props.location.Booking.returnFlightSeats.length; i++){
        arr.splice(arr.indexOf(props.location.Booking.returnFlightSeats[i]), 1);
      }
      await axios.put('http://localhost:8000/adminUpdateFlight/'+props.location.ReturnFlight._id, {SeatsBooked: arr})
      await axios.put('http://localhost:8000/updateBooking/'+props.location.Booking._id, {returnFlightID: selectedReturn, returnFlightSeats: []})
      history.push({
        pathname: `/booking/${props.location.Booking._id}/seats/return/edit`,
        Payment: true
      });
    }
  
    return (
      <Container >
        <Header title={firstName}/>
        {
          loading ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: '#fff' }}>
              <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
          </div> 
          :
          (returnFlights.length === 0  ? 
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: window.innerHeight-160, backgroundColor: '#fff'}}>
                <Image src={require("../assets/images/error-icon.png").default} style={{width: 100, height: 100}}/>
                <label style={{fontFamily: 'Archivo Black', fontSize: 30, color:'#F0A500'}}>No Results</label>
                <label style={{fontFamily: 'Archivo', fontSize: 20, color:'#000', marginTop: 20}}>Modify your search criteria and try again.</label>
                <Button2 style={{width: 200, height: 50, marginTop: 20}} title={'Back to Home Screen'} onClick={() => history.push('/')}/>
            </div>
            :
          <div style={{width: '100%', display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
          <div style={{height: 70, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)'}}>
            <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25}}>Choose Return Flight</label>
          </div>
         
          {returnFlights.map((flight) => {
            return(
           
              <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{height: 90,width: '95%' ,marginRight: 250,marginLeft: 30, backgroundColor: '#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 30, marginBottom: 20, display: 'flex', flexDirection: 'row',backgroundImage: "url(" + Background + ")"}}>
                          <div style={{width: '100%', display: "flex", flexDirection: 'column', height: '100%',marginRight: 650,marginLeft: 100}}>
                              <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20,marginLeft:10}}>
                                  <label style={{fontFamily: 'Archivo', fontSize: 20,marginRight:20,marginLeft:-40}}>{flight.From}</label>
              
              
                                  <Image src={require("../assets/images/plane.png").default} style={{height: 24, width: 30, marginLeft: -10,marginRight:40}}/>
                                  <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:-30,marginRight:10}}>{flight.To}</label>
                                  
              
                                  <Image src={require("../assets/images/cabin.png").default} style={{height: 24, width: 30, marginLeft: 10}}/>
                                  <label style={{fontFamily: 'Archivo', fontSize: 20,marginRight: 20}}>{flight.Cabin}</label>
                                  <Image src={require("../assets/images/cal.png").default} style={{height: 17, width: 20, marginLeft: 10}}/>
                                  <label style={{fontFamily: 'Archivo', fontSize:20,marginRight:0,marginLeft:0,textOrientation:'sideways'}}>{flight.Flight_Date!=null?(flight.Flight_Date.substring(0,4)):null}</label>
                      <label style={{fontFamily: 'Archivo', fontSize:20,marginRight:0,marginLeft:0,textOrientation:'sideways'}}>{flight.Flight_Date!=null?(flight.Flight_Date.substring(4,7)):null}</label>
                      <label style={{fontFamily: 'Archivo', fontSize:20,marginRight:40,marginLeft:0,textOrientation:'sideways'}}>{flight.Flight_Date!=null?(flight.Flight_Date.substring(7,10)):null}</label>
  
                                  <label style={{fontFamily: 'Archivo',fontSize: 20,marginLeft:-10}}>#{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
                                  <Image src={require("../assets/images/lug5.png").default} style={{height: 24, width: 30, marginLeft: 30}}/>
                                  <label style={{fontFamily: 'Archivo', marginRight: 20}}>{flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}</label>
                                  <label style={{fontFamily: 'Archivo', marginRight:20,marginLeft:10}}><label style={{fontFamily: 'Archivo', fontWeight:'bold',fontSize: 20}}>$</label>{flight.Price?flight.Price:'N/A'}</label>
                                  <label style={{fontFamily: 'Archivo', marginLeft:10,marginRight:-10,textAlignVertical: 'top'}}>{flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
                                  <Image src={require("../assets/images/line2.png").default} style={{height: 24, width: 30, marginLeft:10}}/>
                                  <label style={{fontFamily: 'Archivo', marginLeft:0}}>{flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
                                  <Image src={require("../assets/images/dur2.jpg").default} style={{height: 24, width: 30, marginLeft: 10}}/>
                                  <label style={{fontFamily: 'Archivo', marginLeft: 0,marginRight:-50}}>   
                             
                               {durationString(flight.Trip_Duration)}</label>
              
                               <div style={{alignItems:'center',width:'50%'}}>
                            {selectedReturn === flight._id ? <Button3 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right:50 }} onClick={()=>{setSelectedReturn('');  }} /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, position: 'absolute', right: 50  }}  onClick={() => {setSelectedReturn(flight._id);}}/>}
                            
              </div>
                              </div>
                             </div>
                              
                          </div>
                        </div>
          );})}
          
         
          <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: -35}}>
            <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Round Trip Flight: <label style={{fontFamily: 'Archivo Black', color: '#F0A500'}}>{ props.match.params.from} - {props.match.params.to}</label></label>
            <Button1 loading={loading2} disabled={selectedReturn === '' } onClick={() => handle()} title={'Confirm Selection'} style={{fontSize: 20, position: 'absolute', right: 50, width: 180, height: 40}}/>
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

export default ModifyReturnBookingResults;