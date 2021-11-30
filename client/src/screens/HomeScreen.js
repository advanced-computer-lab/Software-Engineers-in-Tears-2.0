import React, {useState, useEffect} from "react";
import styled from "styled-components";
import NormalHeader from "../components/NormalHeader";
import ProfileHeader from "../components/ProfileHeader";
import Button1 from "../components/Button1";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function HomeScreen(props) {

  const history = useHistory();
  const [hover1, setHover1] = useState('rgba(240,165,0,1)');

  localStorage.setItem('userID', '619ff5980bb5b4ed8b4f7f64')
  //localStorage.clear()

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [cabin, setCabin] = useState('');
  const [user, setUser] = useState({});
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
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
  

  function handle(event){

    event.preventDefault();
    var pcount = parseInt(adults === '' ? 0 : adults, 10)+parseInt(children === '' ? 0 : children,10);

    var f = new Date(fromDate)
    var t = new Date(toDate)

    if(pcount===0){
      alert("You have to insert a number of passengers!");
    }
    else if(t.getTime()<f.getTime){
      alert('Your arrival date is before your departure date!')
    }
    else if(from === '' || to === ''){
      alert("Please specify your departure and arrival airport terminals!");
    }
    else{
    history.push({
      pathname: '/flights',
      showAll: false,
      flightData: {
        From: from, 
        To: to,
        Cabin:cabin,
        PassengerCount: pcount,
        FromDate:fromDate,
        ToDate: toDate, 
      }
    });}
   }

  return (
    <Container>
      {userID ? <ProfileHeader title={user.First_Name} path={'/'}/> : <NormalHeader />}
      <div style={{height: 190, backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <input
          type='text'
          value={from}
          placeholder={'From'}
          style={{
            height: 50,
            width: '8%',
            marginLeft: 50,
            backgroundColor: '#000',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid #F0A500',
            color: '#f4f4f4'
          }}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Image120 style={{height: 40, width: 40, marginLeft: 25}} src={require("../assets/images/2arrow.png").default}></Image120> 
        <input
          type='text'
          value={to}
          placeholder={'To'}
          style={{
            height: 50,
            width: '8%',
            marginLeft: 25,
            backgroundColor: '#000',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid #F0A500',
            color: '#f4f4f4'
          }}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type='number'
          value={adults}
          placeholder={'Number of Adults'}
          style={{
            height: 50,
            width: '11%',
            marginLeft: 25,
            backgroundColor: '#000',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid #F0A500',
            color: '#f4f4f4'
          }}
          onChange={(e) =>  {e.target.value < 0 ? setAdults(0) : setAdults(e.target.value)}}
        />
        <input
          type='number'
          value={children}
          placeholder={'Number of Children'}
          style={{
            height: 50,
            width: '11%',
            marginLeft: 25,
            backgroundColor: '#000',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid #F0A500',
            color: '#f4f4f4'
          }}
          onChange={(e) => {e.target.value < 0 ? setChildren(0) : setChildren(e.target.value)} }
        />
        <input
          type='text'
          value={cabin}
          placeholder={'Cabin'}
          style={{
            height: 50,
            width: '10%',
            marginLeft: 25,
            backgroundColor: '#000',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid #F0A500',
            color: '#f4f4f4'
          }}
          onChange={(e) => setCabin(e.target.value)}
        />
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: '10%', marginLeft: 25}}>
          <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Depart Date</label>
        <input
          type='date'
          value={fromDate}
          placeholder={'Fromdate'}
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#000',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid #F0A500',
            color: '#f4f4f4',
          }}
          onChange={(e) => setFromDate(e.target.value)}
        />
        </div>
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: '10%', marginLeft: 25}}>
          <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Arrival Date</label>
        <input
          type='date'
          value={toDate}
          placeholder={'Todate'}
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#000',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: '2px solid #F0A500',
            color: '#f4f4f4',
          }}
          onChange={(e) => setToDate(e.target.value)}
        />
        </div>
        <Image35
          style={{background: hover1, position: 'absolute', right: 50, width: 50, height: 50}}
          onMouseEnter={() => setHover1('rgba(207,117,0,1)')} 
          onMouseLeave={() => setHover1('rgba(240,165,0,1)')} 
          src={require("../assets/images/search.png").default}
          onClick={handle}
        ></Image35>   
      </div>
      <Image3>
        <LoremIpsum>REDISCOVER THE JOY<br/>OF TRAVELING</LoremIpsum>
        <LoremIpsum2>
          Find trip inspiration and the latest travel requirements<br/>with Dune Airlines.
        </LoremIpsum2>
        <Button1
          style={{
            height: 58,
            width: 207,
            marginTop: 50,
            marginLeft: 50
          }}
          title={'GET STARTED'}
        />
      </Image3>
      <LoremIpsum3 style={{textAlign: 'center'}}>THE DUNE CUSTOMER EXPERIENCE</LoremIpsum3>
      <LoremIpsum4 style={{textAlign: 'center'}}>Supporting You Through Your Travel Journey</LoremIpsum4>

      <Image5Row>
        <Image5 src={require("../assets/images/43687521.png").default}></Image5>
        <Image6 src={require("../assets/images/30501287.png").default}></Image6>
        <Image7 src={require("../assets/images/bell.png").default}></Image7>
      </Image5Row>

      <Rect2Row style={{justifyContent: 'center'}}>
        <Rect2>
          <LoremIpsum10>WHAT IS THE CURRENT<br/>FLIGHT SCHEDULE?</LoremIpsum10>
          <LoremIpsum11>
            Flight impacted due to covid? Stay<br/>on top of the flight
            schedule and <br/>follow all the latest updates.
          </LoremIpsum11>
          <Button1
            style={{
              height: 46,
              width: 175,
              marginTop: 86,
              marginLeft: 30
            }}
            title={'VIEW FLIGHTS'}
          />
        </Rect2>
        <Rect3>
          <LoremIpsum5>CAN I CANCEL/CHANGE <br/>MY FLIGHT?</LoremIpsum5>
          <LoremIpsum6>
            We understand you have questions <br/>about our change/cancel
            policy. <br/>Learn more about our tickets, <br/>change fees and
            fare difference <br/>policies.
          </LoremIpsum6>
          <Button1
            style={{
              height: 46,
              width: 201,
              marginTop: 40,
              marginLeft: 30
            }}
            title={'MODIFY FLIGHT'}
          />
        </Rect3>
        <Rect4>
          <LoremIpsum7>WHAT ARE THE LATEST <br/>TRAVEL UPDATES?</LoremIpsum7>
          <LoremIpsum8Stack>
            <LoremIpsum8></LoremIpsum8>
            <LoremIpsum9>
              Information is more important than <br/>ever. We pledge to share
              updates <br/>with you as quickly as possible, <br/>with full
              transparency. Sign up to<br/>stay updated with all the latest
              news.
            </LoremIpsum9>
          </LoremIpsum8Stack>
          <Button1
            style={{
              height: 46,
              width: 166,
              marginTop: 39,
              marginLeft: 37
            }}
            title={'SIGN UP NOW'}
          />
        </Rect4>
      </Rect2Row>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image3 = styled.div`
  height: 365px;
  flex-direction: column;
  display: flex;
  background-image: url(${require("../assets/images/425451.jpg").default});
  background-size: cover;
`;

const Image35 = styled.img`
  border-radius: 100px;
  cursor: pointer;
`;

const LoremIpsum = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 38px;
  margin-top: 58px;
  margin-left: 50px;
`;

const LoremIpsum2 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 24px;
  margin-left: 50px;
`;

const LoremIpsum3 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 25px;
  margin-top: 26px;
`;

const LoremIpsum4 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 40px;
  margin-top: 15px;
`;

const Image120 = styled.img`
`;

const Image5 = styled.img`
  width: 100%;
  height: 170px;
  object-fit: contain;
`;

const Image6 = styled.img`
  width: 100%;
  height: 170px;
  object-fit: contain;
`;

const Image7 = styled.img`
  width: 100%;
  height: 170px;
  object-fit: contain;
`;

const Image5Row = styled.div`
  height: 171px;
  flex-direction: row;
  display: flex;
  margin-top: 66px;
`;

const Rect2 = styled.div`
  width: 385px;
  height: 321px;
  background-color: #E6E6E6;
  flex-direction: column;
  display: flex;
`;

const LoremIpsum10 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 32px;
  margin-left: 30px;
`;

const LoremIpsum11 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 5px;
  margin-left: 30px;
`;

const Rect3 = styled.div`
  width: 385px;
  height: 321px;
  background-color: #E6E6E6;
  flex-direction: column;
  display: flex;
  margin-left: 54px;
`;

const LoremIpsum5 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 32px;
  margin-left: 30px;
`;

const LoremIpsum6 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 5px;
  margin-left: 30px;
`;

const Rect4 = styled.div`
  width: 385px;
  height: 321px;
  background-color: #E6E6E6;
  flex-direction: column;
  display: flex;
  margin-left: 56px;
`;

const LoremIpsum7 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 32px;
  margin-left: 36px;
`;

const LoremIpsum8 = styled.span`
  font-family: Roboto;
  top: 13px;
  left: 1px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
`;

const LoremIpsum9 = styled.span`
  font-family: Archivo;
  top: -1px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
`;

const LoremIpsum8Stack = styled.div`
  width: 323px;
  height: 110px;
  margin-top: 6px;
  margin-left: 36px;
  position: relative;
`;

const Rect2Row = styled.div`
  height: 321px;
  flex-direction: row;
  display: flex;
  margin-top: 35px;
`;


export default HomeScreen;