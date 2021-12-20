import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import Button6 from "../components/Button6";

function ChangePassword(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('black');
  const [hover2, setHover2] = useState('black');
  const [hover3, setHover3] = useState('black');
  const [hover4, setHover4] = useState('#F0A500');
  const [hover5, setHover5] = useState('black');

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
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: 200}}>
            <label onMouseEnter={() => setHover1('#CF7500')} onMouseLeave={() => setHover1('black')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15}} onClick={() => history.push('/profile/home')}>Home</label>
            <label onMouseEnter={() => setHover2('#CF7500')} onMouseLeave={() => setHover2('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2}} onClick={() => history.push('/profile/account')}>My Account</label>
            <label onMouseEnter={() => setHover3('#CF7500')} onMouseLeave={() => setHover3('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3}} onClick={() => history.push('/profile/bookings')}>My Bookings</label>
            <label onMouseEnter={() => setHover4('#CF7500')} onMouseLeave={() => setHover4('#F0A500')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover4}} onClick={() => history.push('/profile/changepassword')}>Change Password</label>
            <label onMouseEnter={() => setHover5('#CF7500')} onMouseLeave={() => setHover5('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover5}} onClick={() => {history.push('/'); localStorage.clear()}}>Log Out</label>
          </div>
          <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
            
          </div>
        </div>
        <Footer />
    </Container>
  );
}

const Container = styled.div`
`;

const Image3 = styled.div`
  background-image: url(${require("../assets/images/user_bg.jpg").default});
  background-size: cover;
`;

const Image = styled.img`
`;

export default ChangePassword;