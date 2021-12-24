import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Button1 from "../components/Button1";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import Footer from "../components/Footer";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";

function Signup(props) {

  const history = useHistory();

  const [conditionsMet, setConditionsMet] = useState([]);
  const [passowrdStrength, setPasswordStrength] = useState('Weak');

  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [homeAddressError, setHomeAddressError] = useState(false);
  const [passportNumberError, setPassportNumberError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [color, setColor] = useState('red');

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
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handle(event){
    event.preventDefault();
    setErrors([])
    setFirstNameError(false)
    setLastNameError(false)
    setHomeAddressError(false)
    setPassportNumberError(false)
    setPhoneNumberError(false)
    setEmailError(false)
    setUsernameError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    let re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const arr = [];
    setLoading(true)
    if(firstName.length === 0){
      arr.push('Please enter your first name')
      setFirstNameError(true)
    }  
    if(lastName.length === 0){
      arr.push('Please enter your last name')
      setLastNameError(true)
    }
    if(homeAddress.length === 0){
      arr.push('Please enter your home address')
      setHomeAddressError(true)
    }  
    if(passportNumber.length === 0){
      arr.push('Please enter your passport number')
      setPassportNumberError(true)
    }
    if(phoneNumber.length === 0){
      arr.push('Please enter your phone number')
      setPhoneNumberError(true)
    }
    if(email.length === 0){
      arr.push('Please enter your email address')
      setEmailError(true)
    }
    else if(!re.test(email)){
      arr.push('Please enter a valid email address')
      setEmailError(true)
    }
    else {
      const res = await axios.post('http://localhost:8000/getUserByID/', {Email: email})
      console.log(res.data)
      if(res.data.length > 0){
        console.log('true')
        arr.push('This email already exists')
        setEmailError(true)
      }
    }
    if(username.length === 0){
      arr.push('Please enter a username')
      setUsernameError(true)
    }
    else {
      const res = await axios.post('http://localhost:8000/getUserByID/', {Username: username})
      console.log(res.data)
      if(res.data.length > 0){
        console.log('true')
        arr.push('This username already exists')
        setUsernameError(true)
      }
    }
    if(password.length === 0){
      arr.push('Please enter a password')
      setPasswordError(true)
    }
    else if(password !== confirmPassword){
      arr.push('Passwords do not match')
      setConfirmPasswordError(true)
    }
    else if(passowrdStrength !== 'Strong'){
      arr.push('Please fullfil all password requirements')
      setPasswordError(true)
    }
    console.log(arr)
    setErrors(arr)
    if(arr.length === 0){
      axios.post('http://localhost:8000/createuser', {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Home_Address: homeAddress,
        Telephone_Number: phoneNumber,
        Passport_Number: passportNumber,
        Password: password,
        Username: username,
        Type: 'Customer',
      })
      .then(res => {
        history.push({
          pathname: '/login',
          register: true,
          message: 'Registration Successful!'
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
    }
    else{
      setLoading(false)
    }
  }

  function checkPassword(password){
    setPassword(password)
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
      <Header title={null}/>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <label style={{fontFamily: 'Archivo', fontSize: 14, marginTop: 50}}>L O Y A L T Y</label>
        <label style={{fontFamily: 'Archivo', fontSize: 37, marginTop: 10}}>Join Dune Airlines</label>
        <label style={{textAlign: 'center', fontFamily: 'Archivo', fontSize: 14, marginTop: 10}}>Open up a world of rewards every time you travel. Enjoy reward flights, upgrades, <br/>exclusive benefits and more.</label>
        <div style={{boxShadow: '0px 1px 5px  0.35px #000', width: '80%', marginTop: 30, display: 'flex', flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '60%', alignItems: 'center'}}>
            <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <input style={{height: 50, width: '40%', fontSize: 20, border: firstNameError ? '2px solid red' : null}} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              <input style={{height: 50, width: '40%', fontSize: 20, marginLeft: '4%', border: lastNameError ? '2px solid red' : null}} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <label style={{fontFamily: 'Archivo', marginTop: 10}}>Your name must be entered in English as it appears on your passport.</label>
            <input style={{height: 50, width: '85%', fontSize: 20, marginTop: 20, border: homeAddressError ? '2px solid red' : null}} placeholder="Home Address" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)}/>
            <input style={{height: 50, width: '85%', fontSize: 20, marginTop: 20, border: passportNumberError ? '2px solid red' : null}} placeholder="Passport Number" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)}/>
            <PhoneInput
              country={'eg'}
              style={{marginTop: 20, width: 300, border: phoneNumberError ? '2px solid red' : null}}
              enableSearch={true}
              countryCodeEditable={false}
              value={phoneNumber} 
              onChange={phone => setPhoneNumber(phone)}
            />
            <input style={{height: 50, width: '85%', fontSize: 20, marginTop: 20, border: emailError ? '2px solid red' : null}} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type={'email'}/>
            <input style={{height: 50, width: '85%', fontSize: 20, marginTop: 20, border: usernameError ? '2px solid red' : null}} placeholder="Username" autoComplete="new-password" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <input style={{height: 50, width: '40%', fontSize: 20, border: passwordError ? '2px solid red' : null}} autoComplete="new-password" placeholder="Password" type={'password'} value={password} onChange={(e) => checkPassword(e.target.value)}/>
              <input style={{height: 50, width: '40%', fontSize: 20, marginLeft: '4%', border: confirmPasswordError ? '2px solid red' : null}} placeholder="Confirm Password" type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <div style={{width: '25%', height: 4, backgroundColor: password.length > 0 ? color : 'gray' }}/>
              <div style={{width: '25%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength !== 'Weak'  && password.length > 0 ? color : 'gray'}}/>
              <div style={{width: '25%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength === 'Strong' && password.length > 0 ? color : 'gray'}}/>
            </div>
            <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 14}}>Password Strength: <label style={{fontFamily: 'Archivo Black'}}>{password.length > 0 ? passowrdStrength : ''}</label></label>
            <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 12, textAlign: 'center'}}>Your password should contain a minimum of eight characters. Please use a combination of uppercase and lowercase letters along with numbers.</label>
            <div style={{width: '100%', flexDirection: 'row', display: 'flex', marginTop: 20, alignItems: 'center'}}>
              <input style={{height: 60, width: 60, marginLeft: 20}} type={'checkbox'}/>
              <label style={{fontFamily: 'Archivo', marginLeft: 10, fontSize: 13}}>Sign up to receive Dune newsletters and special offer emails. You can unsubscribe at any time via the link in our emails, by updating your Dune Airlines account preferences or by contacting us. For more details on how we use your personal information, please visit our help page.</label>
            </div>
            {errors.length === 0 ? null : <div style={{width: '80%', backgroundColor: '#ffdbe0', border: '2px solid red', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {renderErrors()}
            </div>}
            <Button1 onClick={handle} loading={loading} style={{width: 250, height: 50, marginTop: 20}} title={'Create Account'}/>
            <label style={{fontFamily: 'Archivo', fontSize: 13, marginBottom: 40, marginTop: 40}}>By creating an account you are agreeing to the Dune Airlines programme rules and our privacy policy.</label>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', width: '40%', alignItems: 'center'}}>
            <Logo src={require("../assets/images/signup.jpeg").default} style={{width: '93%', height: 240, marginTop: 20}}/>
            <div style={{width: '80%', height: 300, boxShadow: '0px 1px 5px  0.35px #000', marginTop: -20, zIndex: 1000, backgroundColor: '#fff', display: 'flex', flexDirection: 'column'}}>
              <label style={{fontFamily: 'Archivo', fontSize: 26, marginLeft: 20, marginTop: 30}}>Change the way you <br/>see the world</label>
              <div style={{width: 40, marginTop: 20, marginLeft: 20, height: 3, backgroundColor: '#F0A500'}}/>
              <label style={{marginLeft: 20, marginTop: 20, fontFamily: 'Archivo', marginRight: 20}}>It costs nothing to join - just complete this application form and start enjoying the benefits. It's easy to earn Skywards Miles and even more rewarding to spend them.</label>
              <label style={{marginLeft: 20, marginBottom: 30, marginTop: 'auto', fontFamily: 'Archivo', marginRight: 20, fontSize: 14}}>For more information please check the Terms and Conditions.</label>
            </div>
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

export default Signup;