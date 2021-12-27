import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Button1 from "../components/Button1";
import Footer from "../components/Footer";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";

function ForgotPassword(props) {

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');

  const [hover, setHover] = useState('black');

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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

    setLoading(true);
    if(username.length === 0){
        setError(true)
        setLoading(false)
    }
    else{
        const res = await axios.post('http://localhost:8000/getUserByID/', {Username: username})
        if(res.data.length > 0){
            var emailText = `Please click the following link to change your password: http://localhost:3000/forgotpassword/${res.data[0]._id}`;
            let mailOptions = {
            from: 'dunesairlines@gmail.com',
            to: res.data[0].Email,
            subject: 'Reset Password',
            text: emailText,
            html: `<p> ${emailText}</p>`,
            };
            axios.post('http://localhost:8000/sendMail', mailOptions)
            .then(res => {
                console.log(res.data);
                setSuccess(true)
                setLoading(false)
            })
            .catch(err => console.log(err));
        }
        else{
            setSuccess(true)
            setLoading(false)
        }
    }   
  }

  return (
    <Container>
      <Header />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 70}}>
        <label style={{fontFamily: 'Archivo', fontSize: 14, marginTop: 50}}>L O Y A L T Y</label>
        <label style={{fontSize: 40, fontFamily: 'Archivo', marginTop: 20, color: '#000'}}>Reset Password</label>
        <label style={{fontFamily: 'Archivo', fontSize: 22, marginTop: 20, textAlign: 'center'}}>We'll send you an email that will direct you to create a new <br />password for your Dune Airlines account.</label>
        <div style={{width: 450, backgroundColor: '#fff', marginTop: 40, boxShadow: '0px 1px 5px  0.35px #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 30}}>
            {success ? 
              <div style={{width: 350, height: 50, backgroundColor: '#a8e4a0',  marginTop: 20, border: '2px solid green', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <label style={{color: 'green', fontFamily: 'Archivo', fontSize: 17}}>An email has been sent!</label>
              </div>
            : null}
            {error ? <div style={{width: 350, height: 50, backgroundColor: '#ffdbe0', border: '2px solid red', display: 'flex',  alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
              <label style={{color: 'red', fontFamily: 'Archivo', fontSize: 17}}>Please enter your username</label>
            </div> : null}
            <input style={{height: 50, width: 350, marginTop: 20, fontSize: 20}} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Button1 loading={loading} style={{height: 50, width: 350, marginTop: 20, marginBottom: 20}} title={'Reset Password'} onClick={handle}/>
            <label onMouseEnter={() => setHover('#F0A500')} onMouseLeave={() => setHover('black')} onClick={() => history.push('/login')} style={{fontFamily: 'Archivo', fontSize: 16, marginTop: 15, textDecorationLine: 'underline', marginBottom: 15, cursor: 'pointer', color: hover}}>Go back</label>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${require("../assets/images/dune-plane2.jpg").default});
  background-size: auto;
`;

export default ForgotPassword;