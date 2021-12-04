import React, {Component} from 'react';
import Button1 from "../components/Button1";
import styled from "styled-components";


class PaymentScreen extends Component{
    
    constructor(props){
        super(props);
    }

    // componentDidMount(){

    //     this.backListener = this.props.history.listen((location, action) =>{
    //         console.log(location);
    //         if(action === "POP"){ 
    //             console.log('Popped');
    //             this.props.history.goBack();
    //         }
    //     })
    // }

    //  componentWillUnmount(){
    //      this.backListener();
    //  }

    render(){
        return(
            <Container style={{alignItems:'center', justifyContent:'center', height:window.innerHeight}}>
                <Button1 title={this.props.location.bookingID} style={{height:50, width:200}} onClick={() => this.props.history.push('/booking/iternary')}/>
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