import React, {useState, useEffect} from "react";
import styled from "styled-components";
import NormalHeader from "../components/NormalHeader";
import ReactLoading from 'react-loading';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Footer from "../components/Footer";
import Button1 from "../components/Button1";
import ProfileHeader from "../components/ProfileHeader";

function ChosenFlights(props) {

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({});
    const [bookings, setBookings] = useState([])
    const [flight1, setFlight1] = useState({});
    const [flight2, setFlight2] = useState({});
    const id1 = useState(props.match.params.id1)[0];
    const id2 = useState(props.match.params.id2)[0];
    const userID = useState(props.match.params.userID)[0];
    const passengerCount = useState(props.match.params.passengerCount)[0];

    useEffect(() => {
        setLoading(true)
        if(userID != null){
          axios.post('http://localhost:8000/getUserByID/', {_id: userID})
          .then(res => {
            setLogged(true)
            //console.log(res.data[0])
            setUser(res.data[0]);
            setBookings(res.data[0].Bookings)
            //console.log(user)
          })
          .catch(err => {
            console.log(err);
          })
        }
        axios.post('http://localhost:8000/adminsearchflights/', {_id: id1})
        .then(res => {
            setFlight1(res.data[0]);
        })
        .catch(err => {
            console.log(err);
        })
        axios.post('http://localhost:8000/adminsearchflights/', {_id: id2})
        .then(res => {
            setFlight2(res.data[0]);
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
        })
        //setLoading(false)
    }, [id1, id2, userID]);
    
    function handleSubmit() {
      if(logged){
        setLoading2(true)
        const newBooking={
          departFlightID: id1,
          returnFlightID: id2,
          userID: userID,
          PassengerCount: passengerCount
        }
        axios.post('http://localhost:8000/createbooking',newBooking).then(res => {
          history.push(`/booking/${res.data._id}/seats/depart`)
          const arr = bookings.slice()
          arr.push(res.data._id)
          const data = {
            Bookings: arr
          }
          axios.put('http://localhost:8000/addBooking/' + userID, data)
            .then(result=> {
          })
            .catch(err => console.log(err));
        })
        .catch(err =>{
          console.log(err);
        })
      }
    }

  return ( 
    <Container>
      {logged ? <ProfileHeader title={user.First_Name} path={'/'}/> : <NormalHeader />}
      {loading ? 
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: '#f4f4f4'}}>
            <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
        </div> 
      : 
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', minHeight: 557, backgroundColor: '#fff'}}>
            <div style={{height: 70, width: '100%', backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25, marginLeft: 50}}>Booking Summary</label>
            </div>
            <div style={{height: 70, width: '100%', backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Depart <label style={{fontFamily: 'Archivo Black', color: '#fff'}}>{flight1.Flight_Date}</label></label>
              <Image1 src={require("../assets/images/flight-icon.png").default} style={{position: 'absolute', right: 50, width: 35, height: 35}}/>
            </div>
            <div style={{display: "flex", flexDirection: 'row', alignItems: 'center', height: 300}}>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>From</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight1.From}</label>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>3:10 PM</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>2h 10m</label>
                <Image2 src={require("../assets/images/arrow.png").default} style={{width: 200}}></Image2>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>To</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight1.To}</label>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>5:20 PM</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Flight Number</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight1.FlightNumber != null ? flight1.FlightNumber : 'N/A'}</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Cabin</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight1.Cabin}</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Seats</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>N/A</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Price</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{passengerCount} x ${flight1.Price != null ? flight1.Price : 'N/A'}</label>
              </div>
            </div>

            <div style={{height: 70, width: '100%', backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Return <label style={{fontFamily: 'Archivo Black', color: '#fff'}}>{flight2.Flight_Date}</label></label>
              <Image1 src={require("../assets/images/flight-icon-inverse.png").default} style={{position: 'absolute', right: 50, width: 35, height: 35}}/>
            </div>
            <div style={{display: "flex", flexDirection: 'row', alignItems: 'center', height: 300}}>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>From</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight2.From}</label>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>3:10 PM</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>2h 10m</label>
                <Image2 src={require("../assets/images/arrow.png").default} style={{width: 200}}></Image2>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>To</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight2.To}</label>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>5:20 PM</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Flight Number</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight2.FlightNumber != null ? flight2.FlightNumber : 'N/A'}</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Cabin</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{flight2.Cabin}</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Seats</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>N/A</label>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <label style={{fontFamily: 'Archivo', fontSize: 20, textAlign: 'center'}}>Price</label>
                <label style={{fontFamily: 'Archivo Black', fontSize: 40, textAlign: 'center'}}>{passengerCount} x ${flight2.Price != null ? flight2.Price : 'N/A'}</label>
              </div>
            </div>
            <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: -35}}>
              <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Booking Total: <label style={{fontFamily: 'Archivo Black', color: '#F0A500'}}>${passengerCount*flight1.Price + passengerCount*flight2.Price}</label></label>
              <Button1 onClick={() => handleSubmit()} loading={loading2} title={'Confirm Booking'} style={{fontSize: 20, position: 'absolute', right: 50, width: 180, height: 40}}/>
            </div>
        </div> 
      }
      <Footer />  
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image1 = styled.img`
`;

const Image2 = styled.img`
`;

export default ChosenFlights;