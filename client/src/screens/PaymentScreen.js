import React, {Component} from 'react';
import Button1 from "../components/Button1";
import styled from "styled-components";
import axios from "axios";


class PaymentScreen extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            booking:null,
            flight1:null,
            flight2:null,
            payLoading:true
        }
    }

    componentDidMount(){

        axios.post('http://localhost:8000/getBookingByID', {_id:this.props.location.state['bookingID']})
        .then(res=>{
            this.setState({booking:res.data[0], payLoading:false});

            axios.post('http://localhost:8000/adminsearchflights', {_id:res.data[0].departFlightID})
            .then(f1 => {
                this.setState({flight1:f1.data[0]});
            })
            .catch(err => console.log(err));
            
            axios.post('http://localhost:8000/adminsearchflights', {_id:res.data[0].returnFlightID})
            .then(f1 => {
                this.setState({flight2:f1.data[0]});
            })
            .catch(err => console.log(err));


        })
        .catch(err=> console.log(err));


        // this.backListener = this.props.history.listen((location, action) =>{
        //     console.log(location.state);
        //     console.log(location);
        //     if(action === "POP"){ 
        //         console.log();
        //         this.props.history.goBack();
        //     }
        // })
    }

    //  componentWillUnmount(){
    //      this.backListener();
    //  }

    render(){
        return(
            <Container style={{alignItems:'center', justifyContent:'center', height:window.innerHeight}}>
                
                <Button1 loading={this.state.payLoading} disabled={this.state.payLoading} title='Pay' style={{height:50, width:200}} 
                onClick={() => this.props.history.push({
                    pathname:`/iternary/${this.state.booking.departFlightID}/${this.state.booking.returnFlightID}/${this.state.booking.departFlightSeats.length}`,
                    booking:this.state.booking
                }
                    )}/>
                
            </Container>
        )
    }
}

const Container = styled.div`
  display: flex;
  background-color: rgba(244,244,244,1);
  flex-direction: column;
`;

export default PaymentScreen;