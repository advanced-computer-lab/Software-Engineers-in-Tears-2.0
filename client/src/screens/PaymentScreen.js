import React, { Component } from 'react';
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
            newFlight1: null,
            newFlight2: null,
            selectedDepartSeats: null,
            selectedReturnSeats: null,
            paymentAmount: 0,
            loading: false,
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

                if(this.props.location.state['paymentAmount'] && this.props.location.state['paymentAmount']>0){
                    this.setState({paymentAmount:  this.props.location.state['paymentAmount']})
                }
                
                if(this.props.location.state['departFlightID']){
                    axios.post('http://localhost:8000/adminsearchflights', { _id: this.props.location.state['departFlightID'] })
                    .then(f => this.setState({
                        newFlight1: f.data[0],
                        selectedDepartSeats: this.props.location.state.selectedDepartSeats
                    }))
                    .catch(err=>console.log(err))
                }

                if(this.props.location.state['returnFlightID']){
                    axios.post('http://localhost:8000/adminsearchflights', { _id: this.props.location.state['returnFlightID'] })
                    .then(f => this.setState({
                        newFlight2: f.data[0],
                        selectedReturnSeats: this.props.location.state.selectedReturnSeats
                    }))
                    .catch(err=>console.log(err))
                }

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
        this.setState({loading: true});
        const amount = this.state.paymentAmount||(this.state.flight1['Price'] + this.state.flight2['Price'])*this.state.booking['departFlightSeats'].length;
        console.log(amount);
        // const amount = 20;
        console.log('in token handler')
        axios.put('http://localhost:8000/pay', {token: token, amount: amount})
        .then(res=>{

            console.log('in .then of payment')
            if(!this.state.newFlight1 && !this.state.newFlight2){
            var emailString = `You have successfully reserved and paid $${amount} for your round trip from ${this.state.flight1.From} to ${this.state.flight1.To} and back!
        Your booking ID is ${this.state.booking._id}
        Departure Fight:
        From: ${this.state.flight1.From} To: ${this.state.flight1.To}
        Takeoff: ${this.state.flight1.Flight_Date.toString().substring(0, 10)} at ${this.state.flight1.DepartureTime}
        Landing: ${this.state.flight1.Arrival_Date.toString().substring(0, 10)} at ${this.state.flight1.ArrivalTime}
        Flight Number: ${this.state.flight1.FlightNumber}
        Number of Passengers: ${this.state.booking.departFlightSeats.length}
        Cabin: ${this.state.flight1.Cabin}
        Seat Number(s): ${this.state.booking.departFlightSeats.join(', ')}
        Baggage Allowance: ${this.state.flight1.Baggage_Allowance} kg
            
        Return Flight:
        From: ${this.state.flight2.From} To: ${this.state.flight2.To}
        Takeoff: ${this.state.flight2.Flight_Date.toString().substring(0, 10)} at ${this.state.flight2.DepartureTime}
        Landing: ${this.state.flight2.Arrival_Date.toString().substring(0, 10)} at ${this.state.flight2.ArrivalTime}
        Flight Number: ${this.state.flight2.FlightNumber}
        Number of Passengers: ${this.state.booking.returnFlightSeats.length}
        Cabin: ${this.state.flight2.Cabin}
        Seat Number(s): ${this.state.booking.returnFlightSeats.join(', ')}
        Baggage Allowance: ${this.state.flight2.Baggage_Allowance} kg
            
        Please use the following link to access your reservations.
        http://localhost:3000/profile/bookings`; 
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
                        pathname: `/itinerary/${this.state.booking.departFlightID}/${this.state.booking.returnFlightID}/${this.state.booking.departFlightSeats.length}`,
                        booking: this.state.booking
                    });
                    
                })
                .catch(err => console.log(err));

                })
                .catch(err => console.log(err));
            }
            else{ // if either the depart or the return flight was modified
                if(this.state.newFlight1){
                    const res = this.state.flight1;
                    const arr = res.SeatsBooked;
                    console.log(arr);
                    console.log(this.state.booking.departFlightSeats)
                    for(let i = 0; i < this.state.booking.departFlightSeats.length; i++){
                        arr.splice(arr.indexOf(this.state.booking.departFlightSeats[i]), 1);
                    }
                    var promiseArr = [];
                    promiseArr.push(axios.put('http://localhost:8000/adminUpdateFlight/'+this.state.flight1._id, {SeatsBooked: arr}).catch(err=>console.log(err)));
                    promiseArr.push(axios.put('http://localhost:8000/adminUpdateFlight/'+this.state.newFlight1._id, {$push:{SeatsBooked:this.state.selectedDepartSeats}}).catch(err=>console.log(err)));
                    promiseArr.push(axios.put('http://localhost:8000/updateBooking/'+this.state.booking._id, {departFlightID: this.state.newFlight1._id, departFlightSeats: this.state.selectedDepartSeats}).catch(err=>console.log(err)));

                    Promise.all(promiseArr)
                    .then(results =>{
                        var newBooking = {...this.state.booking}
                        newBooking.departFlightSeats = this.state.selectedDepartSeats;
                        this.props.history.push({
                            pathname:`/itinerary/${this.state.newFlight1._id}/${this.state.flight2._id}/${this.state.selectedDepartSeats.length}`,
                            booking: newBooking
                        })
                    })
                }
                else if(this.state.newFlight2){
                    const res = this.state.flight2;
                    const arr = res.SeatsBooked;
                    console.log(arr);
                    console.log(this.state.booking.returnFlightSeats)
                    for(let i = 0; i < this.state.booking.returnFlightSeats.length; i++){
                        arr.splice(arr.indexOf(this.state.booking.returnFlightSeats[i]), 1);
                    }
                    var promiseArr = [];
                    promiseArr.push(axios.put('http://localhost:8000/adminUpdateFlight/'+this.state.flight2._id, {SeatsBooked: arr}).catch(err=>console.log(err)));
                    promiseArr.push(axios.put('http://localhost:8000/adminUpdateFlight/'+this.state.newFlight2._id, {$push:{SeatsBooked:this.state.selectedReturnSeats}}).catch(err=>console.log(err)));
                    promiseArr.push(axios.put('http://localhost:8000/updateBooking/'+this.state.booking._id, {returnFlightID: this.state.newFlight2._id, returnFlightSeats: this.state.selectedReturnSeats}).catch(err=>console.log(err)));

                    Promise.all(promiseArr)
                    .then(results =>{
                        var newBooking = {...this.state.booking}
                        newBooking.returnFlightSeats = this.state.selectedReturnSeats;
                        this.props.history.push({
                            pathname:`/itinerary/${this.state.flight1._id}/${this.state.newFlight2._id}/${this.state.selectedReturnSeats.length}`,
                            booking: newBooking
                        })
                    })
                }
            }

        })
    }

    render() {
        if(!this.props.location.state || !this.props.location.state.bookingID || this.state.error){
            return(
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: window.innerWidth, height: window.innerHeight, backgroundColor: '#fff'}}>
              <Image1 src={require("../assets/images/error-icon.png").default} style={{width: 100, height: 100}}/>
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
                this.state.flight1 && this.state.flight2 && !this.state.loading?
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                    <div style={{marginLeft:200, width:'100%'}}>
                <BookingCard
                    style={{marginLeft:300, width:window.innerWidth}}
                    Booking={this.state.booking}
                    beforePayment={true}
                    DepartFlight={this.state.newFlight1||this.state.flight1}
                    ReturnFlight={this.state.newFlight2||this.state.flight2}
                    DepartFlightSeats={this.state.selectedDepartSeats}
                    ReturnFlightSeats={this.state.selectedReturnSeats}
                    Price={this.state.paymentAmount||(this.state.flight1['Price'] + this.state.flight2['Price'])*this.state.booking['departFlightSeats'].length}
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

const Image1 = styled.img`
`;

export default PaymentScreen;