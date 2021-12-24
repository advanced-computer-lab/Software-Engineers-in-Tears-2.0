import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import Button6 from "../components/Button6";

function ProfileHome(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('#F0A500');
  const [hover2, setHover2] = useState('black');
  const [hover3, setHover3] = useState('black');
  const [hover4, setHover4] = useState('black');
  const [hover5, setHover5] = useState('black');
  const [hover6, setHover6] = useState('black');
  const [hover7, setHover7] = useState('black');
  const [hover8, setHover8] = useState('black');

  const firstName = useState(localStorage.getItem('firstName'))[0];

  useEffect(() => {
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(!res.data.isLoggedIn){
          localStorage.clear()
          history.push('/')
        }
        else if(res.data.Type === 'administrator'){
          history.push('/admin')
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [history]);

  return (
    <Container style={{display: "flex", flexDirection: 'column'}}>
        <Header title={firstName} selected={'Name'}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: 200}}>
            <label onMouseEnter={() => setHover1('#CF7500')} onMouseLeave={() => setHover1('#F0A500')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15}} onClick={() => history.push('/profile/home')}>Home</label>
            <label onMouseEnter={() => setHover2('#CF7500')} onMouseLeave={() => setHover2('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2}} onClick={() => history.push('/profile/account')}>My Account</label>
            <label onMouseEnter={() => setHover3('#CF7500')} onMouseLeave={() => setHover3('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3}} onClick={() => history.push('/profile/bookings')}>My Bookings</label>
            <label onMouseEnter={() => setHover4('#CF7500')} onMouseLeave={() => setHover4('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover4}} onClick={() => history.push('/profile/changepassword')}>Change Password</label>
            <label onMouseEnter={() => setHover5('#CF7500')} onMouseLeave={() => setHover5('black')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover5}} onClick={() => {history.push('/'); localStorage.clear()}}>Log Out</label>
          </div>
          <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
            <Image3 style={{marginTop: 20, height: 180, marginRight: 180, display: 'flex', flexDirection: 'row'}}>
              <div style={{display: "flex", flexDirection: 'column'}}>
                <label style={{fontSize: 20, fontFamily: 'Archivo', color: '#fff', marginLeft: 20, marginTop: 20}}>Welcome to <br/>Dune Skywards</label>
                <label style={{fontSize: 17, fontFamily: 'Archivo', color: '#fff', marginLeft: 20, marginTop: 'auto', marginBottom: 20}}>EK 675 975 720 | Blue tier</label>
              </div>
              <div style={{display: "flex", flexDirection: 'column', height: '90%', width: '30%', marginLeft: 'auto', marginRight: 20, backgroundColor: '#f4f4f4', alignSelf: 'center'}}>
                <label style={{fontSize: 35, marginLeft: 20, marginTop: 20, fontFamily: 'Archivo'}}>0</label>
                <label style={{fontSize: 20, marginLeft: 20, fontFamily: 'Archivo'}}>Skyward Miles</label>
                <label style={{fontSize: 11, marginLeft: 20, fontFamily: 'Archivo', marginTop: 'auto', marginBottom: 10}}>Low on Miles? Visit <label onMouseEnter={() => setHover8('#CF7500')} onMouseLeave={() => setHover8('black')} style={{cursor: 'pointer', textDecorationLine: 'underline', color: hover8}}>Earning Miles</label> to learn more</label>
              </div>
            </Image3>
            <div style={{marginRight: 180, backgroundColor: '#fff', boxShadow: '0px 1px 5px  0.35px #000', marginTop: 20, display: 'flex', flexDirection: 'row'}}>
              <Image style={{height: 220, width: 250}} src={require("../assets/images/paris.png").default}/>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: 21, fontFamily: 'Archivo', color: '#000', marginLeft: 30, marginTop: 20}}>Welcome to Skywards+</label>
                <div style={{width: 70, marginTop: 15, marginLeft: 30, height: 3, backgroundColor: '#F0A500'}}/>
                <label style={{marginLeft: 30, fontSize: 15, fontFamily: 'Archivo', marginTop: 15}}>Skywards+ offers you additional benefits to make your travels even <br/>more rewarding. From more bonus Skywards Miles on flights, to extra <br/>lounge access for you and loved ones, choose the package that suits <br/>your lifestyle best.</label>
                <Button6 style={{width: 140, height: 30, marginTop: 'auto', marginLeft: 30, marginBottom: 20}} title={'Learn More'}/>
              </div>
            </div>
            <div style={{marginTop: 20, display: 'flex', flexDirection: 'row'}}>
              <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#fff', boxShadow: '0px 1px 5px  0.35px #000', zIndex: 1000, height: '90%', alignSelf: 'center', width: '100%', marginRight: -20}}>
                <label style={{fontSize: 25, fontFamily: 'Archivo', color: '#000', marginLeft: 30, marginTop: 20}}>Share your miles with your family</label>
                <div style={{width: 70, marginTop: 15, marginLeft: 30, height: 3, backgroundColor: '#F0A500'}}/>
                <label style={{marginLeft: 30, fontSize: 13, fontFamily: 'Archivo', marginTop: 15}}>- Combine your Skywards Miles and reach rewards faster.</label>
                <label style={{marginLeft: 30, fontSize: 13, fontFamily: 'Archivo', marginTop: 15}}>- Add your family’s details and save time when you book.</label>
                <label style={{marginLeft: 30, fontSize: 13, fontFamily: 'Archivo', marginTop: 15}}>- Redeem your Miles for flights for the whole family.</label>
                <Button6 style={{width: 140, height: 30, marginTop: 'auto', marginLeft: 30, marginBottom: 20}} title={'Learn More'}/>
              </div>
              <Image style={{height: 300, width: 340, marginLeft: 'auto', marginRight: 180}} src={require("../assets/images/family.jpg").default}/>
            </div>
            <Image src={require("../assets/images/woman.jpg").default} style={{marginTop: 20, height: 180, marginRight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            
            </Image>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: 180}}>
              <label style={{marginTop: 15, fontFamily: 'Archivo', fontSize: 15, textAlign: 'center'}}>Now you can Multiply Miles to enjoy your next reward faster. Double, triple or quadruple your eligible Skywards Miles at <br/>a special rate of USD 20 for every 1,000 Miles now</label>
              <label onMouseEnter={() => setHover6('#CF7500')} onMouseLeave={() => setHover6('black')} style={{color: hover6, fontFamily: 'Archivo', fontSize: 19, textAlign: 'center', marginTop: 15, cursor: 'pointer', textDecorationLine: 'underline'}}>Learn More</label>
            </div>
            <Image src={require("../assets/images/sports.jpg").default} style={{marginTop: 20, height: 180, marginRight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            
            </Image>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: 180}}>
              <label style={{marginTop: 15, fontFamily: 'Archivo', fontSize: 15, textAlign: 'center'}}>From sporting events and concerts, to exclusive fan experiences, merchandise and more. All you need are your Skywards Miles to enjoy moments you’ll cherish forever.</label>
              <label onMouseEnter={() => setHover7('#CF7500')} onMouseLeave={() => setHover7('black')} style={{color: hover7, fontFamily: 'Archivo', fontSize: 19, textAlign: 'center', marginTop: 15, cursor: 'pointer', textDecorationLine: 'underline'}}>Learn More</label>
            </div>
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

export default ProfileHome;