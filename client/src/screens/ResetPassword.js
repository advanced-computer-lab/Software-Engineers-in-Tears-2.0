import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Button1 from "../components/Button1";
import Footer from "../components/Footer";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";

function ResetPassword(props) {

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState('red');

  const [conditionsMet, setConditionsMet] = useState([]);
  const [passowrdStrength, setPasswordStrength] = useState('Weak');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);


  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(res.data.isLoggedIn){
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
  }, [handle, history]);


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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handle(event){

    event.preventDefault();

    setLoading(true);
    setConfirmNewPasswordError(false)
    setNewPasswordError(false)
    const arr = [];
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
      setErrors(arr)
      if(arr.length === 0){
        await axios.post('http://localhost:8000/resetPassword/', {newPassword: newPassword, userID: props.match.params.id})
        history.push({
            pathname: '/login',
            register: true,
            message: 'Password Change Successful!'
          })
          setLoading(false)
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
    <Container>
      <Header />
      <div style={{backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <label style={{fontFamily: 'Archivo', fontSize: 14, marginTop: 50}}>L O Y A L T Y</label>
        <label style={{fontSize: 40, fontFamily: 'Archivo', marginTop: 20, color: '#000'}}>Reset Password</label>
        <div style={{boxShadow: '0px 1px 5px  0.35px #000', marginTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 800}}>
              <input style={{height: 50, width: '50%', fontSize: 20, border: newPasswordError ? '2px solid red' : null, marginTop: 20}} autoComplete="new-password" placeholder="New Password" type={'password'} value={newPassword} onChange={(e) => checkPassword(e.target.value)}/>
              <input style={{height: 50, width: '50%', fontSize: 20, border: confirmNewPasswordError ? '2px solid red' : null, marginTop: 20}} placeholder="Confirm Password" autoComplete="new-password" type={'password'} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
              <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 20}}>
                <div style={{width: '15%', height: 4, backgroundColor: newPassword.length > 0 ? color : 'gray' }}/>
                <div style={{width: '15%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength !== 'Weak'  && newPassword.length > 0 ? color : 'gray'}}/>
                <div style={{width: '15%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength === 'Strong' && newPassword.length > 0 ? color : 'gray'}}/>
              </div>
              <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 14}}>Password Strength: <label style={{fontFamily: 'Archivo Black'}}>{newPassword.length > 0 ? passowrdStrength : ''}</label></label>
              <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 12, textAlign: 'center'}}>Your password should contain a minimum of eight characters. Please use a combination of uppercase and lowercase letters along with numbers.</label>
              {errors.length === 0 ? null : <div style={{width: '80%', backgroundColor: '#ffdbe0', border: '2px solid red', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                {renderErrors()}
              </div>}
              <Button1 onClick={handle} loading={loading} style={{width: 250, height: 50, marginTop: 20, marginBottom: 20}} title={'Change Password'}/>
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

export default ResetPassword;