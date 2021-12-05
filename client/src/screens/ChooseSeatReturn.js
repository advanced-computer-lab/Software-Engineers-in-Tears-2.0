import React, {useState, useEffect} from "react";
import styled from "styled-components";
import ReactLoading from 'react-loading';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Footer from "../components/Footer";
import Button1 from "../components/Button1";
import ProfileHeader from "../components/ProfileHeader";

function ChooseSeatReturn(props) {

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [user, setUser] = useState({});
    const [flight, setFlight] = useState({});
    const [seatsBooked, setSeatsBooked] = useState();
    const [currentSelection, setCurrentSelection] = useState([]);
    const bookingID = useState(props.match.params.bookingID)[0];
    const [booking, setBooking] = useState({});

    useEffect(() => {
        setLoading(true)
        getData();
    }, []);

    const getData = async() => {
        const res = await axios.post('http://localhost:8000/getBookingByID/', {_id: bookingID})
        setBooking(res.data[0])
        const res2 = await axios.post('http://localhost:8000/getUserByID/', {_id: localStorage.getItem("userID")})
        setUser(res2.data[0])
        const res3 = await axios.post('http://localhost:8000/adminsearchflights/', {_id: res.data[0].returnFlightID})
        setFlight(res3.data[0])
        const arr = res.data[0].returnFlightSeats;
        console.log(res.data[0].returnFlightSeats)
        setCurrentSelection(arr)
        const arr4 = res3.data[0].SeatsBooked;
        for(let i = 0; i < res.data[0].returnFlightSeats.length; i++){
            if(res3.data[0].SeatsBooked.includes(res.data[0].returnFlightSeats[i])){
                arr4.splice(arr4.indexOf(arr[i]), 1)
            }
        }
        setSeatsBooked(arr4)
        setLoading(false) 
    }
    
    function handleSubmit() {
        setLoading2(true)
        const arr = seatsBooked.slice()
        arr.push(...currentSelection)
        const data = {
            SeatsBooked: arr
        }
        const data2 = {
            returnFlightSeats: currentSelection
        }
        axios.put('http://localhost:8000/updateBooking/' + bookingID, data2)
        .then(result=> {
            
        })
        .catch(err => console.log(err));
        axios.put('http://localhost:8000/adminUpdateFlight/' + flight._id, data)
        .then(result=> {
            history.push({
                pathname:'/booking/payment',
                state:{
                    bookingID:bookingID
                }
            });
            setLoading2(false);
        })
        .catch(err => console.log(err));
    }

    function handleSelect(i) {  
        if(currentSelection.includes(i)){
            const arr = currentSelection.slice();
            arr.splice(currentSelection.indexOf(i), 1)
            setCurrentSelection(arr)
        }
        else if(currentSelection.length < booking.PassengerCount){
            const arr = currentSelection.slice();
            arr.push(i);
            setCurrentSelection(arr)      
        }
        else if(booking.PassengerCount === 1){
            const arr = currentSelection.slice();
            arr.splice(currentSelection.indexOf(0), 1)
            arr.push(i);
            setCurrentSelection(arr) 
        }
    }

    const renderText = () => {
        let seats = [];
        for(let i = 0; i < currentSelection.length; i++){
            seats.push(
                <label style={{fontFamily: 'Archivo Black', color: '#F0A500'}}>{flight.Cabin.substr(0,1)}{currentSelection[i]}{i === currentSelection.length-1 ? '' :', '}</label>
            )
        }
        return seats;
    }

    const renderSeats = () => {
        let seats = [];
        for (let i = 1; i <= flight.Seats_Available_on_Flight; i+=5) {
          seats.push(
              <div style={{display: 'flex', flexDirection: 'column', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 25, marginLeft: 25, marginRight: 25}}>
                <Image1 
                    key={i} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i) ? null : 'pointer' }} 
                    src={seatsBooked.includes(i) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i) ? () => handleSelect(i) : null}
                />
                { i+1 <= flight.Seats_Available_on_Flight ?
                    <Image1 
                    key={i+1} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i+1) ? null : 'pointer'}} 
                    src={ seatsBooked.includes(i+1) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i+1) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i+1) ? () => handleSelect(i+1) : null}
                    />
                    :
                    null
                }
                { i+2 <= flight.Seats_Available_on_Flight ?
                    <Image1 
                    key={i+2} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i+2) ? null : 'pointer', marginTop: 50}} 
                    src={ seatsBooked.includes(i+2) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i+2) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i+2) ? () => handleSelect(i+2) : null}
                    />
                    :
                    null
                }
                { i+3 <= flight.Seats_Available_on_Flight ?
                    <Image1 
                    key={i+3} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i+3) ? null : 'pointer'}} 
                    src={ seatsBooked.includes(i+3) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i+3) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i+3) ? () => handleSelect(i+3) : null}
                    />
                    :
                    null
                }
                { i+4 <= flight.Seats_Available_on_Flight ?
                    <Image1 
                    key={i+4} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i+4) ? null : 'pointer'}} 
                    src={ seatsBooked.includes(i+4) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i+4) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i+4) ? () => handleSelect(i+4) : null}
                    />
                    :
                    null
                }
              </div>
          )
        }
        //setLoading(false);
        return seats;
    }

  return ( 
    <Container>
      <ProfileHeader title={user.First_Name} path={'/'}/>
      {
          loading ?
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: '#fff'}}>
                <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
            </div> 
        :
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', minHeight: 557, backgroundColor: '#fff'}}>
                <div style={{height: 70, width: '100%', backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 25, marginLeft: 50}}>Return Flight From {flight.From} to {flight.To}</label>
                </div>
                <div style={{height: 120, width: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Image1 style={{width: 50, height: 50}} src={require("../assets/images/available-seat.png").default}/>
                    <label style={{color: '#000', fontFamily: 'Archivo Black', fontSize: 25, marginLeft: 10}}>= Available Seat</label>
                    <Image1 style={{width: 50, height: 50, marginLeft: 50}} src={require("../assets/images/selected-seat.png").default}/>
                    <label style={{color: '#000', fontFamily: 'Archivo Black', fontSize: 25, marginLeft: 10}}>= Selected Seat</label>
                    <Image1 style={{width: 50, height: 50, marginLeft: 50}} src={require("../assets/images/unavailable-seat.png").default}/>
                    <label style={{color: '#000', fontFamily: 'Archivo Black', fontSize: 25, marginLeft: 10}}>= Unavailable Seat</label>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: 350}}>
                    {loading ? null : renderSeats()}
                </div>
                <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: -35, marginTop: 50}}>
                    <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Chosen Seats: {renderText()}</label>
                    <Button1 disabled={currentSelection.length<booking.PassengerCount} onClick={() => handleSubmit()} loading={loading2} title={'Confirm'} style={{fontSize: 20, position: 'absolute', right: 50, width: 180, height: 40}}/>
                </div>
            </div>
      }
      <Footer/>  
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image1 = styled.img`
`;

export default ChooseSeatReturn;