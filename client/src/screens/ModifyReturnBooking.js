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
    const fromDateDep = localStorage.getItem('DepartDate');
    const pcount = localStorage.getItem('PassCount');
    const from = localStorage.getItem('From')
    const to = localStorage.getItem('To')
    
    useEffect(() => {
        axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
          .then(res => {
            if(!res.data.isLoggedIn){
              localStorage.clear();
              history.push('/')
            }
            else if(res.data.Type === 'administrator'){
              history.push('/admin')
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
      }, [handleReturn, history]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
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
            pathname: `/searchReturn/from=${from}/to=${to}/cabin=${cabin === '' ? null : cabin}/p=${pcount}/fromDate=${fromDate === '' ? localStorage.getItem('ReturnDate') : fromDate}/editReturn`,
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