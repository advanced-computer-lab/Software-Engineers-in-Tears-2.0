import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';

function ProfileHome(props) {

  const history = useHistory();

  const firstName = useState(localStorage.getItem('firstName'))[0];

  useEffect(() => {
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(!res.data.isLoggedIn){
          localStorage.clear()
          history.push('/')
        }
      })
      .catch(err => {
        console.log(err);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={{display: "flex", flexDirection: 'column'}}>
        <Header title={firstName} selected={'Name'}/>
        <div style={{display: 'flex', flexDirection: 'column', height: 1000}}>
          <label onClick={() => history.push('/profile/home')}>Home</label>
          <label onClick={() => history.push('/profile/account')}>My Account</label>
          <label onClick={() => history.push('/profile/bookings')}>My Bookings</label>
          <label onClick={() => {history.push('/'); localStorage.clear()}}>Log Out</label>
        </div>
        <Footer />
    </Container>
  );
}

const Container = styled.div`
`;

export default ProfileHome;