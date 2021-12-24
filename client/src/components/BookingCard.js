import React, { useState } from "react";
import styled from "styled-components";
import Button1 from "./Button1";
import { useHistory } from "react-router-dom";

function BookingCard(props) {

  const [selected, setSelected] = useState('Depart');

  const [hover1, setHover1] = useState('#F0A500');
  const [hover2, setHover2] = useState('');
  const [hover3, setHover3] = useState('red');

  const history = useHistory();


  function handle(){
    history.push({
      pathname: '/searchDepart',
      DepartFlight: props.DepartFlight,
      ReturnFlight: props.ReturnFlight,
      Booking: props.Booking
    });
   }

   function handleReturn(){
    history.push({
      pathname: '/searchReturn',
      DepartFlight: props.DepartFlight,
      ReturnFlight: props.ReturnFlight,
      Booking: props.Booking
    });
   }

  return (
    <div style={{height: 400, marginRight: 180, backgroundColor: '#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 30, marginBottom: 20, display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '40%', display: "flex", flexDirection: 'column', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20}}>{props.DepartFlight.From}</label>
                <Image src={require("../assets/images/2arrow.png").default} style={{height: 24, width: 30, marginLeft: 10}}/>
                <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft: 10}}>{props.DepartFlight.To}</label>
            </div>
            <label style={{fontFamily: 'Archivo', textAlign: 'center',  fontSize: 18, marginTop: 15}}>Total Booking Price: <label style={{color: '#F0A500'}}>${props.Price}</label></label>
            <Image src={require("../assets/images/world-map.png").default} style={{width: 320, height: 180, alignSelf: 'center'}}/>
            <Image src={require("../assets/images/barcode.png").default} style={{width: 210, height: 50, alignSelf: 'center'}}/>
            <label style={{fontFamily: 'Archivo', textAlign: 'center', marginTop: 10, fontSize: 14}}>{props.Booking._id}</label>
            <label onClick={props.DeleteBooking} onMouseEnter={() => setHover3('darkred')} onMouseLeave={() => setHover3('red')} style={{cursor: 'pointer', fontFamily: 'Archivo', textAlign: 'center', marginTop: 'auto', marginBottom: 35, fontSize: 17, textDecorationLine: 'underline', color: hover3}}>Cancel Reservation</label>
        </div>

        <div style={{height: '100%', width: 3, display: 'flex', flexDirection: 'column'}}>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
            <div style={{height: '5%', width: 3, backgroundColor: 'grey', borderRadius: 200, marginTop: 10}}/>
        </div>

        <div style={{width: '60%', display: "flex", flexDirection: 'column', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <div onClick={() => {setSelected('Depart'); setHover2('')}} onMouseEnter={() => setHover1('#CF7500')} onMouseLeave={() => {selected === 'Depart' ? setHover1('#F0A500') : setHover1('')}} style={{width: 150, height: 35, backgroundColor: hover1, cursor: 'pointer', borderRadius: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{fontFamily: 'Archivo', fontSize: 15, color: selected === 'Depart' || hover1 === '#CF7500' ? 'white' : '', cursor: 'pointer'}}>Depart Flight</label>
                </div>
                <div onClick={() => {setSelected('Return'); setHover1('')}} onMouseEnter={() => setHover2('#CF7500')} onMouseLeave={() => {selected === 'Return' ? setHover2('#F0A500') : setHover2('')}} style={{width: 150, height: 35, backgroundColor: hover2, cursor: 'pointer', borderRadius: 50, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <label style={{fontFamily: 'Archivo', fontSize: 15, color: selected === 'Return' || hover2 === '#CF7500' ? 'white' : '', cursor: 'pointer'}}>Return Flight</label>
                </div>
            </div>
            {
                selected === 'Depart' ?
                <div style={{display: 'flex', flexDirection: 'column'}}> 
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20, marginLeft: 20}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 18}}>From: <label style={{color: '#F0A500'}}>{props.DepartFlight.From}</label></label>
                        <label style={{fontFamily: 'Archivo', fontSize: 18, marginLeft: 20}}>To: <label style={{color: '#F0A500'}}>{props.DepartFlight.To}</label></label>
                    </div>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Flight Date: <label style={{color: '#F0A500'}}>{props.DepartFlight.Flight_Date ? props.DepartFlight.Flight_Date.substring(0,10) : 'N/A' }</label></label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Number of Passengers: <label style={{color: '#F0A500'}}>{props.Booking.PassengerCount}</label></label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Cabin: <label style={{color: '#F0A500'}}>{props.DepartFlight.Cabin}</label></label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Seats Booked: {props.Booking.departFlightSeats.length === 0 ? <label style={{color: '#F0A500'}}>No Seats Booked</label> : <label style={{color: '#F0A500'}}>{props.DepartFlight.Cabin.substring(0,1)}{props.Booking.departFlightSeats.join(', ' + props.DepartFlight.Cabin.substring(0,1))}</label>}</label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Baggage Allowance: <label style={{color: '#F0A500'}}>{props.DepartFlight.Baggage_Allowance ? props.DepartFlight.BaggageAllowance : 'N/A'} KG</label></label>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginLeft: 20, marginTop: 40}}>
                        <Button1 style={{width: 200, height: 35}} title={'Modify Reservation'} onClick= {() => handle()} />
                        <Button1 style={{width: 200, height: 35, marginLeft: 20}} title={'Change Seats'} onClick={() => history.push(`/booking/${props.Booking._id}/seats/depart/edit`)}/>
                    </div>
                </div>
                :
                <div style={{display: 'flex', flexDirection: 'column'}}> 
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20, marginLeft: 20}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 18}}>From: <label style={{color: '#F0A500'}}>{props.ReturnFlight.From}</label></label>
                        <label style={{fontFamily: 'Archivo', fontSize: 18, marginLeft: 20}}>To: <label style={{color: '#F0A500'}}>{props.ReturnFlight.To}</label></label>
                    </div>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Flight Date: <label style={{color: '#F0A500'}}>{props.ReturnFlight.Flight_Date ? props.ReturnFlight.Flight_Date.substring(0,10)  : 'N/A' }</label></label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Number of Passengers: <label style={{color: '#F0A500'}}>{props.Booking.PassengerCount}</label></label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Cabin: <label style={{color: '#F0A500'}}>{props.ReturnFlight.Cabin}</label></label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Seats Booked: {props.Booking.returnFlightSeats.length === 0 ? <label style={{color: '#F0A500'}}>No Seats Booked</label> : <label style={{color: '#F0A500'}}>{props.ReturnFlight.Cabin.substring(0,1)}{props.Booking.returnFlightSeats.join(', ' + props.ReturnFlight.Cabin.substring(0,1))}</label>}</label>
                    <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 20, marginLeft: 20}}>Baggage Allowance: <label style={{color: '#F0A500'}}>{props.ReturnFlight.Baggage_Allowance ? props.ReturnFlight.BaggageAllowance : 'N/A'} KG</label></label>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginLeft: 20, marginTop: 40}}>
                        <Button1 style={{width: 200, height: 35}} title={'Modify Reservation'} onClick= {() => handleReturn()} />
                        <Button1 style={{width: 200, height: 35, marginLeft: 20}} title={'Change Seats'} onClick={() => history.push(`/booking/${props.Booking._id}/seats/return/edit`)}/>
                    </div>
                </div>
            }
        </div>
    </div>
  );
}

const Image = styled.img`
`;

export default BookingCard;
