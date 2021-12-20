import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import Button6 from "../components/Button6";
import Button1 from "../components/Button1";

function ChangePassword(props) {

  const history = useHistory();

  const [conditionsMet, setConditionsMet] = useState([]);
  const [passowrdStrength, setPasswordStrength] = useState('Weak');

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const [color, setColor] = useState('red');

  const [hover1, setHover1] = useState('black');
  const [hover2, setHover2] = useState('black');
  const [hover3, setHover3] = useState('black');
  const [hover4, setHover4] = useState('#F0A500');
  const [hover5, setHover5] = useState('black');

  const firstName = useState(localStorage.getItem('firstName'))[0];

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);

  function checkPassword(password){
    setNewPassword(password)
    if(password.length >= 8 && !conditionsMet.includes('length')){
      console.log('reached')
      const arr = [...conditionsMet];
      arr.push('length')
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
      console.log(arr)
    }
    else if(password.length < 8 && conditionsMet.includes('length')){
      console.log('reached222')
      const arr = [...conditionsMet];
      arr.splice(arr.indexOf('length'), 1);
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
      console.log(arr)
    }
    if(/\d/.test(password) && !conditionsMet.includes('number')){
      console.log('reached4')
      const arr = conditionsMet.slice();
      arr.push('number')
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
      console.log(arr)
    }
    else if(!/\d/.test(password) && conditionsMet.includes('number')){
      console.log('reached5')
      const arr = conditionsMet.slice();
      arr.splice(arr.indexOf('number'), 1);
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
      console.log(arr)
    }
    if(/[A-Z]/.test(password) && !conditionsMet.includes('upper')){
      console.log('reached7')
      const arr = conditionsMet.slice();
      arr.push('upper')
      if(password.length === 8){
        arr.push('length')
      }
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
      console.log(arr)
    }
    else if(!/[A-Z]/.test(password) && conditionsMet.includes('upper')){
      console.log('reached8')
      const arr = conditionsMet.slice();
      arr.splice(arr.indexOf('upper'), 1);
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
      console.log(arr)
    }
  }

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
      const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          handle(event)
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handle(event){
    event.preventDefault();
    setErrors([])
    setNewPasswordError(false)
    setConfirmNewPasswordError(false)
    setOldPasswordError(false)
    const arr = [];
    setLoading(true) 
    if(oldPassword.length === 0){
      arr.push('Please enter your old password')
      setOldPasswordError(true)
    }
    if(newPassword.length === 0){
      arr.push('Please enter a password')
      setNewPasswordError(true)
    }
    else if(newPassword !== confirmNewPassword){
      arr.push('Passwords do not match')
      setConfirmNewPasswordError(true)
    }
    else if(passowrdStrength !== 'Strong'){
      arr.push('Please fullfil all password requirements')
      setNewPasswordError(true)
    }
    console.log(arr)
    setErrors(arr)
    if(arr.length === 0){
      const res = await axios.post('http://localhost:8000/changepassword/', {oldPassword: oldPassword, newPassword: newPassword, userID: localStorage.getItem('userID')})
      if(res.data.message == 'Success'){
        history.push('/')
        setLoading(false)
      }
      else{
        const arr2=[]
        arr2.push("Incorrect old password")
        setErrors(arr2)
        setLoading(false)
      }
    }
    else{
      setLoading(false)
    }
  }

  const renderErrors = () => {
    let errorArr = [];
    for(let i = 0; i < errors.length; i++){
        errorArr.push(
            <label style={{fontFamily: 'Archivo', color: '#f00', marginTop: 10, marginBottom: 10}}>{errors[i]}</label>
        )
    }
    return errorArr;
}

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
            <div style={{height: 500, marginRight: 180, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 20, display: 'flex', flexDirection: 'column'}}>
              <input style={{height: 50, width: '40%', fontSize: 20, border: oldPasswordError ? '2px solid red' : null}} autoComplete="new-password" placeholder="Old Password" type={'password'} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
              <input style={{height: 50, width: '40%', fontSize: 20, border: newPasswordError ? '2px solid red' : null}} autoComplete="new-password" placeholder="New Password" type={'password'} value={newPassword} onChange={(e) => checkPassword(e.target.value)}/>
              <input style={{height: 50, width: '40%', fontSize: 20, border: confirmNewPasswordError ? '2px solid red' : null}} placeholder="Confirm Password" type={'password'} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
              <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 20}}>
                <div style={{width: '25%', height: 4, backgroundColor: newPassword.length > 0 ? color : 'gray' }}/>
                <div style={{width: '25%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength !== 'Weak'  && newPassword.length > 0 ? color : 'gray'}}/>
                <div style={{width: '25%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength === 'Strong' && newPassword.length > 0 ? color : 'gray'}}/>
              </div>
              <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 14}}>Password Strength: <label style={{fontFamily: 'Archivo Black'}}>{newPassword.length > 0 ? passowrdStrength : ''}</label></label>
              <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 12, textAlign: 'center'}}>Your password should contain a minimum of eight characters. Please use a combination of uppercase and lowercase letters along with numbers.</label>
              {errors.length === 0 ? null : <div style={{width: '80%', backgroundColor: '#ffdbe0', border: '2px solid red', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                {renderErrors()}
              </div>}
              <Button1 onClick={handle} loading={loading} style={{width: 250, height: 50, marginTop: 20}} title={'Change Password'}/>
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

export default ChangePassword;