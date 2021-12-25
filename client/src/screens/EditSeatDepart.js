import React, {useState, useEffect} from "react";
import styled from "styled-components";
import ReactLoading from 'react-loading';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Footer from "../components/Footer";
import Button1 from "../components/Button1";
import Header from "../components/Header";

function EditSeatDepart(props) {

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [flight, setFlight] = useState({});
    const [seatsBooked, setSeatsBooked] = useState();
    const [currentSelection, setCurrentSelection] = useState([]);
    const bookingID = useState(props.match.params.bookingID)[0];
    const [booking, setBooking] = useState({});

    const firstName = localStorage.getItem("firstName");
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        setLoading(true)
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = async() => {
        const res = await axios.post('http://localhost:8000/getBookingByID/', {_id: bookingID})
        setBooking(res.data[0])
        const res3 = await axios.post('http://localhost:8000/adminsearchflights/', {_id: props.location.departFlightID||res.data[0].departFlightID})
        setFlight(res3.data[0])
        const arr = res.data[0].departFlightSeats;
        console.log(res.data[0].departFlightSeats)
        setCurrentSelection(arr)
        const arr4 = res3.data[0].SeatsBooked;
        for(let i = 0; i < res.data[0].departFlightSeats.length; i++){
            if(res3.data[0].SeatsBooked.includes(res.data[0].departFlightSeats[i])){
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
            departFlightSeats: currentSelection
        }
        if(!props.location.paymentAmount || props.location.paymentAmount<= 0){
            var newBooking = {...booking};
            newBooking.departFlightSeats = currentSelection;
        axios.put('http://localhost:8000/updateBooking/' + bookingID, data2)
        .then(result=> {
            setBooking(newBooking);
        })
        .catch(err => console.log(err));
        axios.put('http://localhost:8000/adminUpdateFlight/' + flight._id, data)
        .then(result=> {
            if( typeof props.location.paymentAmount === 'undefined'){
                history.push('/profile/bookings');
            }
            else{
                
                    var emailString = `You have successfully modified your reserved flight (id: ${booking._id}). We have refunded $${-props.location.paymentAmount} into your account.
                    Please click on the following link to view your reservations
                    http://localhost:3000/profile/bookings`;
                    let mailOptions = {
                        from: 'dunesairlines@gmail.com',
                        to: email,
                        subject: 'Reservation Successfully Changed',
                        text:  `${emailString}`
                      };

                      axios.post('http://localhost:8000/sendMail', mailOptions)
                      .then(res => {
                      console.log(res.data);
                      })
                      .catch(err => console.log(err));
                    history.push({
                        pathname:`/iternary/${booking.departFlightID}/${booking.returnFlightID}/${currentSelection.length}`,
                        booking: newBooking
                    });
                
            }
                
            setLoading2(false);
        })
        .catch(err => console.log(err));
    }
    else{// if paymentAmount exists and is greater than 0

        history.push({
            pathname:'/booking/payment',
            state:{
                bookingID: booking._id,
                departFlightID: props.location.departFlightID,
                selectedDepartSeats: currentSelection,
                paymentAmount: props.location.paymentAmount
            }
        });
    }
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
                <label style={{fontFamily: 'Archivo', color: '#F0A500'}}>{flight.Cabin.substr(0,1)}{currentSelection[i]}{i === currentSelection.length-1 ? '' : ','}</label>
            )
        }
        return seats;
    }

    const renderSeats = () => {
        if(!loading){
        let seats = [];
        let j = 1;
        for (let i = 1; i <= flight.Seats_Available_on_Flight; i+=5) {
          seats.push(
              <div key={i} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 25, marginRight: 25}}>
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
                    <Image1 
                    key={i+1} 
                    style={{width: 50, height: 50}} 
                    src={require("../assets/images/unavailable-seat.png").default}
                    />
                }
                <label style={{fontFamily: 'Archivo', fontSize: 18, marginTop: 25}}>{j}</label>
                { i+2 <= flight.Seats_Available_on_Flight ?
                    <Image1 
                    key={i+2} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i+2) ? null : 'pointer', marginTop: 25}} 
                    src={ seatsBooked.includes(i+2) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i+2) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i+2) ? () => handleSelect(i+2) : null}
                    />
                    :
                    <Image1 
                    key={i+2} 
                    style={{width: 50, height: 50, marginTop: 25}} 
                    src={require("../assets/images/unavailable-seat.png").default}
                    />
                }
                { i+3 <= flight.Seats_Available_on_Flight ?
                    <Image1 
                    key={i+3} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i+3) ? null : 'pointer'}} 
                    src={ seatsBooked.includes(i+3) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i+3) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i+3) ? () => handleSelect(i+3) : null}
                    />
                    :
                    <Image1 
                    key={i+3} 
                    style={{width: 50, height: 50}} 
                    src={require("../assets/images/unavailable-seat.png").default}
                    />
                }
                { i+4 <= flight.Seats_Available_on_Flight ?
                    <Image1 
                    key={i+4} 
                    style={{width: 50, height: 50, cursor: seatsBooked.includes(i+4) ? null : 'pointer'}} 
                    src={ seatsBooked.includes(i+4) ? require("../assets/images/unavailable-seat.png").default : (currentSelection.includes(i+4) ?  require("../assets/images/selected-seat.png").default :  require("../assets/images/available-seat.png").default)}
                    onClick={!seatsBooked.includes(i+4) ? () => handleSelect(i+4) : null}
                    />
                    :
                    <Image1 
                    key={i+4} 
                    style={{width: 50, height: 50}} 
                    src={require("../assets/images/unavailable-seat.png").default}
                    />
                }
              </div>
          )
          j+=1;
        }
        return seats;
    }
    }

  return ( 
    <Container>
      <Header title={firstName}/>
      {
          loading ?
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: '#fff'}}>
                <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
            </div> 
        :
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#f4f4f4'}}>
                <div style={{height: 80, width: '100%', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', backgroundColor: '#fff'}}>
                    <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: 170, marginLeft: 50}}>
                        <div style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                            <Image1 style={{width: 40, height: 40}} src={require("../assets/images/logo2.png").default}/>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 5}}>
                                <label style={{fontFamily: 'Archivo', fontSize: 15}}>{flight.From} - {flight.To}</label>
                                <label style={{fontFamily: 'Archivo', fontSize: 12}}>{currentSelection.length} seats selected</label>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 3, backgroundColor: '#F0A500', marginTop: 'auto'}}/>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{height: 120, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                        <div style={{height: '100%', position: 'absolute', left: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <label style={{fontFamily: 'Archivo Black', fontSize: 15}}>{flight.From} - {flight.To}</label>
                            <label style={{fontFamily: 'Archivo', fontSize: 15, marginTop: 5}}>Flight {flight.FlightNumber ? flight.FlightNumber : '1170'} <label style={{marginLeft: 20}}>Dune Airlines</label></label>
                            <label style={{fontFamily: 'Archivo', fontSize: 15, marginTop: 5}}>{flight.Flight_Date.substr(0,10)}</label>
                        </div>

                        <Image1 style={{width: 35, height: 35, marginLeft: 100}} src={require("../assets/images/available-seat.png").default}/>
                        <label style={{color: '#000', fontFamily: 'Archivo', fontSize: 21, marginLeft: 10}}>Available Seat</label>
                        <Image1 style={{width: 35, height: 35, marginLeft: 35}} src={require("../assets/images/selected-seat.png").default}/>
                        <label style={{color: '#000', fontFamily: 'Archivo', fontSize: 21, marginLeft: 10}}>Selected Seat</label>
                        <Image1 style={{width: 35, height: 35, marginLeft: 35}} src={require("../assets/images/unavailable-seat.png").default}/>
                        <label style={{color: '#000', fontFamily: 'Archivo', fontSize: 21, marginLeft: 10}}>Unavailable Seat</label>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#fff', marginLeft: 50, height: 400, width: 250, border: '2px solid #F0A500', borderRadius: 5, alignSelf: 'center'}}>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 20}}>
                                <div style={{width: 40, height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0A500', marginLeft: 20}}>
                                    <label style={{fontFamily: 'Archivo', fontSize: 20, color: '#fff'}}>{booking.PassengerCount}</label>
                                </div>
                                <label style={{fontFamily: 'Archivo', color: '#000', fontSize: 25, marginLeft: 10}}>{firstName}</label>
                            </div> 
                            <div style={{display:'flex', flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
                                <label style={{fontFamily: 'Archivo'}}>Seats selected: </label>
                                {renderText()}
                            </div>
                            <label style={{fontFamily: 'Archivo', marginLeft: 20, marginTop: 25, fontSize: 13}}>-Extra leg space</label>  
                            <label style={{fontFamily: 'Archivo', marginLeft: 20, marginTop: 10, fontSize: 13}}>-Fine cuisine</label> 
                            <label style={{fontFamily: 'Archivo', marginLeft: 20, marginTop: 10, fontSize: 13}}>-90 degrees recline</label> 
                            <label style={{fontFamily: 'Archivo', marginLeft: 20, marginTop: 10, fontSize: 13}}>-Adjacent to restrooms</label>                         
                            <Image1 style={{width: '100%', height: 120, marginTop: 'auto', borderRadius: 5}} src={require("../assets/images/seats.jpg").default}/> 
                        </div>
                        <Image4 style={{width: 1000, height: 500, marginLeft: 'auto', marginRight: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {loading ? null : renderSeats()}
                        </Image4>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', height: 115, backgroundColor: '#000', marginBottom: -35, borderBottom: '1px solid rgba(60,60,60,1)', alignItems: 'center', marginTop: 20}}>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: 300}}>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <label style={{fontFamily: 'Archivo', fontSize: 15, color: '#fff'}}>Seat Price:</label>
                            <label style={{fontFamily: 'Archivo', fontSize: 15, marginLeft: 'auto', marginRight: 10, color: '#F0A500'}}>${flight.Price ? flight.Price : 'N/A'}</label>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 5}}>
                            <label style={{fontFamily: 'Archivo', fontSize: 15, color: '#fff'}}>Passenger Count:</label>
                            <label style={{fontFamily: 'Archivo', fontSize: 15, marginLeft: 'auto', marginRight: 10, color: '#F0A500'}}>{booking.PassengerCount}</label>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 15, alignItems: 'center'}}>
                            <label style={{fontFamily: 'Archivo', fontSize: 15, color: '#fff'}}>Total Price:</label>
                            <label style={{fontFamily: 'Archivo', fontSize: 19, marginLeft: 'auto', marginRight: 10, color: '#F0A500'}}>${flight.Price ? flight.Price*booking.PassengerCount : 'N/A'}</label>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', width: 300, marginRight: 50}}>
                        <Button1 disabled={currentSelection.length<booking.PassengerCount} onClick={() => handleSubmit()} loading={loading2} title={'Confirm'} style={{fontSize: 20, width: 180, height: 40, marginLeft: 'auto'}}/>
                        <label style={{fontFamily: 'Archivo', fontSize: 12, color: '#fff', marginLeft: 'auto', marginTop: 10}}>Terms and conditions apply.</label>
                    </div>
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

const Image4 = styled.div`
  background-image: url(${require("../assets/images/plane-seats.png").default});
  background-repeat: no-repeat;
  background-size: 1000px 500px;
`;

export default EditSeatDepart;