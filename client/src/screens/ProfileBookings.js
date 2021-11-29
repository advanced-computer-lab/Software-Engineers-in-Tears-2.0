import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ButtonIcon from "../components/ButtonIcon";
import Button1 from "../components/Button1";

function ProfileBookings(props) {

  const history = useHistory();

  const [user, setUser] = useState({});
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if(userID){
      axios.post('http://localhost:8000/getUserByID/', {_id: userID})
      .then(res => {
        setUser(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [userID]);

  return (
    <Container style={{display: "flex", flexDirection: 'row'}}>
        <div style={{width: 200, backgroundColor: '#000', display: 'flex', flexDirection: 'column', height: window.innerHeight, marginBottom: -35, alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: 200, backgroundColor: '#000', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 30}}>
                <Image2
                    src={require("../assets/images/profile-icon.png").default}
                />
                <label style={{color:'#F0A500', fontFamily: 'Archivo Black', fontSize: 20}}>{user.First_Name}</label>
            </div>
            <Button1 style={{width: 170, height: 40, fontSize: 15, position: 'absolute', top: 100}} title={'Back To Home Page'} onClick={() => history.push('/')}/>
            <ButtonIcon path={'home'} style={{width: '100%', height: 70, fontSize: 15}} title={'Home'} onClick={() => history.push('/profile/home')}/>
            <ButtonIcon path={"profile2"} style={{width: '100%', height: 70, fontSize: 15}} title={'My Profile'}/>
            <ButtonIcon path={"wallet"} style={{width: '100%', height: 70, fontSize: 15}} title={'Wallet'}/>
            <ButtonIcon path={"bookings"} style={{width: '100%', height: 70, fontSize: 15}} title={'Bookings'} selected={true}/>
            <Button1 style={{width: 100, height: 40, fontSize: 15, position: 'absolute', bottom: 30}} title={'Logout'} onClick={() => {localStorage.clear(); history.push('/')}}/>
        </div>
    </Container>
  );
}

const Container = styled.div`
`;

const Image2 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default ProfileBookings;