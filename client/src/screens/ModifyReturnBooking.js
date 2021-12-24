import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import axios from 'axios';
import Button1 from "../components/Button1";

function ModifyReturnBooking(props){

    const history = useHistory();
    const [fromDate, setFromDate] = useState('');
    const [cabin, setCabin] = useState('');
    const fromDateDep = props.location.DepartFlight.Flight_Date;
    const pcount = props.location.Booking.PassengerCount;
    const from = props.location.ReturnFlight.From;
    const to = props.location.ReturnFlight.To;
    
    useEffect(() => {
        axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
          .then(res => {
            if(!res.data.isLoggedIn){
              localStorage.clear();
              history.push('/')
            }
          })
          .catch(err => {
            console.log(err);
          })
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            handleReturn(event)
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [handleReturn]);

      function handleReturn(event){
        event.preventDefault();

        var fOfReturn = new Date(fromDate)
        var fOfDepart = new Date(fromDateDep)

        if(cabin === '' && fromDate === ''){
          alert("Please enter your search critera")
        }
        else if(fOfReturn.getTime()<fOfDepart.getTime()){
          alert('Your chosen return date is before your departure flight date!')
        }
        else{
          history.push({
            pathname: `/searchReturn/from=${from}/to=${to}/cabin=${cabin === '' ? props.location.ReturnFlight.Cabin : cabin}/p=${pcount}/fromDate=${fromDate === '' ? props.location.ReturnFlight.Flight_Date : fromDate}/edit`,
            DepartFlight: props.location.DepartFlight,
            ReturnFlight: props.location.ReturnFlight,
            Booking: props.location.Booking
          });
        }
       }

       return (
        <Container>
          <Header title={localStorage.getItem('firstName')}/>
          <div style={{height: 400,width: '90%', boxShadow: '0px 1px 5px  0.35px #000', marginTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
            <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Flight Date</label>
            <input
              type='date'
              value={fromDate}
              placeholder={'Fromdate'}
              style={{
                height: 40,
                width: 150,
                backgroundColor: '#fff',
                borderTop: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                borderBottom: '2px solid #F0A500',
                color: '#000',
              }}
                  onChange={(e) => setFromDate(e.target.value)}
            />
            <label style={{color: '#F0A500', fontFamily: 'Archivo Black', marginTop: 20}}>Cabin Class</label>
            <input value={cabin} onChange={(e) => setCabin(e.target.value)} style={{height: 40, width: 150, fontSize: 20, borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '2px solid #F0A500', color: '#000'}}/>
            <Button1 onClick={handleReturn} title={'Search'} style={{width: 150, height: 40, marginTop: 20}}/>  
          </div>
          <Footer />
        </Container>
      );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ModifyReturnBooking;