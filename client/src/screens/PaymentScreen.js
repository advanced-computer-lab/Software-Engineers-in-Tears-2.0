import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import styled from "styled-components";
import axios from "axios";
import Stripe from 'react-stripe-checkout';
import BookingCard from '../components/BookingCard';
import ReactLoading from 'react-loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
class PaymentScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            booking: null,
            flight1: null,
            flight2: null,
            payLoading: true,
            userID: '',
            email: '',
            firstName:null,
            error: false
        }
    }

    componentDidMount() {

        axios.post('http://localhost:8000/auth', { token: localStorage.getItem('token') })
            .then(res => {
                if (!res.data.isLoggedIn) {
                    localStorage.clear();
                    this.props.history.push('/');
                }
                else {
                    this.setState({ email:localStorage.getItem('userEmail'), userID: localStorage.getItem('userID'), firstName: localStorage.getItem('firstName')});
                }
            })
            .catch(err => {
                console.log(err);
            })
            if(!this.props.location.state || !this.props.location.state.bookingID){
                return;
            }
        axios.post('http://localhost:8000/getBookingByID', { _id: this.props.location.state['bookingID'] })
            .then(res => {
                console.log('hello')
                this.setState({ booking: res.data[0], payLoading: false });
                if(!res.data[0]){
                    this.setState({error:true})
                }
                console.log(res);
                axios.post('http://localhost:8000/adminsearchflights', { _id: res.data[0].departFlightID })
                    .then(f1 => {
                        this.setState({ flight1: f1.data[0] });
                    })
                    .catch(err => console.log(err));

                axios.post('http://localhost:8000/adminsearchflights', { _id: res.data[0].returnFlightID })
                    .then(f1 => {
                        this.setState({ flight2: f1.data[0] });
                    })
                    .catch(err => console.log(err));


            })
            .catch(err => console.log(err));


    }

    tokenHandler = (token) =>{
        const amount = (this.state.flight1['Price'] + this.state.flight2['Price'])*this.state.booking['departFlightSeats'].length;
        console.log(amount);
        // const amount = 20;
        console.log('in token handler')
        axios.put('http://localhost:8000/pay', {token: token, amount: amount})
        .then(res=>{

            console.log('in .then of payment')

            var emailString = `You have successfully reserved and paid $${amount} for your round trip from ${this.state.flight1.From} to ${this.state.flight1.To} and back!
        Your booking ID is ${this.state.booking._id}
        Departure Fight:
        From: ${this.state.flight1.From} To: ${this.state.flight1.To}
        Takeoff: ${this.state.flight1.Flight_Date} at ${this.state.flight1.DepartureTime}
        Landing: ${this.state.flight1.Arrival_Date} at ${this.state.flight1.ArrivalTime}
        Flight Number: ${this.state.flight1.FlightNumber}
        Number of Passengers: ${this.state.booking.departFlightSeats.length}
        Cabin: ${this.state.flight1.Cabin}
        Seat Number(s): ${this.state.booking.departFlightSeats.join(', ')}
        Baggage Allowance: ${this.state.flight1.Baggage_Allowance} kg
            
        Return Flight:
        From: ${this.state.flight2.From} To: ${this.state.flight2.To}
        Takeoff: ${this.state.flight2.Flight_Date} at ${this.state.flight2.DepartureTime}
        Landing: ${this.state.flight2.Arrival_Date} at ${this.state.flight2.ArrivalTime}
        Flight Number: ${this.state.flight2.FlightNumber}
        Number of Passengers: ${this.state.booking.returnFlightSeats.length}
        Cabin: ${this.state.flight2.Cabin}
        Seat Number(s): ${this.state.booking.returnFlightSeats.join(', ')}
        Baggage Allowance: ${this.state.flight2.Baggage_Allowance} kg
            
        Please use the following link to access your reservations.
        http://localhost:3000/profile/bookings`; 
            var div = document.createElement('div');
            let mailOptions = {
                from: 'dunesairlines@gmail.com',
                to: token.email,
                subject: 'Booking Reserved',
                text:  `${emailString}`
              };

            axios.post('http://localhost:8000/sendMail', mailOptions)
            .then(res => {
            console.log(res.data);
            })
            .catch(err => console.log(err));

            axios.post('http://localhost:8000/getUserByID', {_id: this.state.userID} )
            .then(user =>{

                console.log('in .then of getting user');
                console.log(user);
                const arr = user.data[0]['Bookings'].slice()
                arr.push(this.state.booking._id)
                const data = {
                Bookings: arr
                }

                axios.put('http://localhost:8000/updateUser/' + this.state.userID, data)
                .then((res)=>{
                    console.log('Booking has been added to user\'s account successfully ');
                    this.props.history.push({
                        pathname: `/iternary/${this.state.booking.departFlightID}/${this.state.booking.returnFlightID}/${this.state.booking.departFlightSeats.length}`,
                        booking: this.state.booking
                    });
                    
                })
                .catch(err => console.log(err));

                })
        })
    }

    render() {
        if(!this.props.location.state || !this.props.location.state.bookingID || this.state.error){
            return(
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: window.innerWidth, height: window.innerHeight, backgroundColor: '#fff'}}>
              <img src={require("../assets/images/error-icon.png").default} style={{width: 100, height: 100}}/>
              <label style={{fontFamily: 'Archivo Black', fontSize: 30, color:'#F0A500'}}>Error</label>
              <label style={{fontFamily: 'Archivo', fontSize: 20, color:'#000', marginTop: 20}}>Please try booking a flight first.</label>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Button2 style={{width: 200, height: 50, marginTop: 20}} title={'Back to Home Screen'} onClick={() => this.props.history.push('/')}/>
              </div>
          </div>
            )
        }
        return (
            <Container >
                <Header title={this.state.firstName}/>

                {/* <Button1 loading={this.state.payLoading} disabled={this.state.payLoading} title='Pay' style={{ height: 50, width: 200 }}
                    onClick={() => this.props.history.push({
                        pathname: `/iternary/${this.state.booking.departFlightID}/${this.state.booking.returnFlightID}/${this.state.booking.departFlightSeats.length}`,
                        booking: this.state.booking
                    }
                    )} /> */}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:50, marginBottom:50}}>
                {
                this.state.flight1 && this.state.flight2?
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                    <div style={{marginLeft:200, width:'100%'}}>
                <BookingCard
                    style={{marginLeft:300, width:window.innerWidth}}
                    Booking={this.state.booking}
                    beforePayment={true}
                    DepartFlight={this.state.flight1}
                    ReturnFlight={this.state.flight2}
                    Price={(this.state.flight1['Price'] + this.state.flight2['Price'])*this.state.booking['departFlightSeats'].length}
                    DeleteBooking={()=>{
                        axios.delete("http://localhost:8000/deleteBooking/"+ this.state.booking._id, this.state.booking)
                        .then(res=>{
                            axios.put('http://localhost:8000/updateUser/' + this.state.booking.userID, { $pullAll:{Bookings: [this.state.booking._id]} })
                            this.props.history.push('/');

                        })
                        .catch(err =>{
                            this.props.history.push('/');
                        })
                    }}
                />
                </div>
                <div>
                <Stripe
                    // style={{background: 'rgba(220,220,220,1)'}}
                    stripeKey="pk_test_51K9eBiE3tUFaTxwPjrjK0Jns2NkfdOCdIihstKLbEtSKlYefppSekDc16Fe25oYsntCvVxCbSiAICl7BVcq9AXRB00nw1uYa7i"
                    token={this.tokenHandler}
                    label='Pay with card'
                    currency='usd'
                    email={this.state.email}
                    ComponentClass='Button1'
                />
                </div>
                </div>
                :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: window.innerWidth, height: window.innerHeight }}>
                <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
                </div>
                    }
                    </div>

            <Footer/> 
            </Container>
        )
    }
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,255,255,1);
  flex-direction: column;
`;

export default PaymentScreen;