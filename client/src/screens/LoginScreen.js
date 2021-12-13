import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Footer from "../components/Footer";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function LoginScreen(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('rgba(240,165,0,1)');
  const [hover2, setHover2] = useState('rgba(240,165,0,1)');

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handle(event)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handle]);
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handle(event){

    event.preventDefault();
    
    
  }

  return (
    <Container>
      <div style={{height: 58, backgroundColor: '#000', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 50}} onClick={() => history.push('/')}>
          <Logo src={require("../assets/images/logo3.png").default} style={{width: 40, height: 40}}/>
          <label style={{color: '#fff', fontFamily: 'Archivo', marginLeft: 10, fontSize: 20, cursor: 'pointer'}}>Dune</label>
        </div>
      </div>
      <div style={{backgroundColor: '#f4f4f4', height: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: -35}}>
        <label style={{fontSize: 40, fontFamily: 'Archivo', marginTop: 50, color: '#000'}}>Log in to Dune</label>
        <label style={{fontSize: 20, fontFamily: 'Archivo', marginTop: 20, textAlign: 'center'}}>Earn Miles every time you fly with us and our partners. And <br/>spend your Skywards Miles on a world of rewards.</label>
        <div style={{minHeight: 480, width: '85%', backgroundColor: '#fff', marginTop: 60, boxShadow: '0px 1px 5px  0.35px #000', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '49%', height: '100%', justifyContent: 'center'}}>
            <label style={{fontFamily: 'Archivo', fontSize: 25, marginLeft: 40}}>Login</label>
            <input style={{height: 50, width: '70%', marginTop: 20, fontSize: 20, marginLeft: 40}} placeholder="Email"/>
            <label style={{fontFamily: 'Archivo', fontSize: 18, color: hover1, cursor: 'pointer', marginTop: 10, textDecorationLine: 'underline', marginLeft: 40}} onMouseEnter={() => setHover1('rgba(207,117,0,1)')} onMouseLeave={() => setHover1('rgba(240,165,0,1)')}>Forget your email?</label>
            <input style={{height: 50, width: '70%', marginTop: 20, fontSize: 20, marginLeft: 40}} placeholder="Password" type={'password'}/>
            <label style={{fontFamily: 'Archivo', fontSize: 18, color: hover2, cursor: 'pointer', marginTop: 10, textDecorationLine: 'underline', marginLeft: 40}} onMouseEnter={() => setHover2('rgba(207,117,0,1)')} onMouseLeave={() => setHover2('rgba(240,165,0,1)')}>Forget your password?</label>
            <Button1 style={{height: 50, width: '70%', marginTop: 20, marginLeft: 40}} title={'Log in'}/>
          </div>
          <div style={{width: 3, height: '85%', backgroundColor: '#696969'}}/>
          <div style={{display: 'flex', flexDirection: 'column', width: '49%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <label style={{fontFamily: 'Archivo Black', fontSize: 18, marginTop: 10, marginLeft: 40}}>Not a Dune Airlines member yet?</label>
            <label style={{fontFamily: 'Archivo', textAlign: 'center', fontSize: 18, marginTop: 10, marginLeft: 40}}>Register now to make the most of every mile<br />with Dune Airlines</label>
            <Button2 style={{height: 50, width: '50%', marginTop: 30, marginLeft: 40, border: '2px solid rgba(207,117,0,1)'}} onClick={() => history.push('/signup')} title={'Join Now'}/>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
`;

export default LoginScreen;