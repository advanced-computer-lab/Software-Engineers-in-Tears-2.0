import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Button5 from "../components/Button5";
import Button1 from "../components/Button1";
import Button6 from "../components/Button6";
import Button7 from "../components/Button7";
import Footer from "../components/Footer";
import {Motion, spring} from 'react-motion';
import "./styles.css";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import axios from 'axios';

function HomeScreen(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('');
  const [hover2, setHover2] = useState('');
  const [hover3, setHover3] = useState('');
  const [hover4, setHover4] = useState('');
  const [hover5, setHover5] = useState('rgba(240,165,0,1)');
  const [hover6, setHover6] = useState('rgba(240,165,0,1)');
  const [hover7, setHover7] = useState('');
  const [hover8, setHover8] = useState('');
  const [hover9, setHover9] = useState('');
  const [hover10, setHover10] = useState('');

  //localStorage.setItem('firstName', 'Adham')
  //localStorage.clear()

  console.log(localStorage.getItem('userID'));

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [cabin, setCabin] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [selected, setSelected] = useState('Search');

  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(!res.data.isLoggedIn){
          localStorage.clear();
        }
        else if(res.data.Type === 'administrator'){
          history.push('/admin')
        }
        else{
          setFirstName(localStorage.getItem('firstName'))
        }
      })
      .catch(err => {
        console.log(err);
      })
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        handle(event)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handle, history]);
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handle(event){

    event.preventDefault();
    var pcount = parseInt((adults === '' ? 0 : adults), 10)+parseInt((children === '' ? 0 : children),10);
   
    
    var f = new Date(fromDate)
    var t = new Date(toDate)

    if(pcount===0){
      alert("You have to insert a number of passengers!");
    }
    else if(t.getTime()<f.getTime()){
      alert('Your arrival date is before your departure date!')
    }
    else if(from === '' || to === ''){
      alert("Please specify your departure and arrival airport terminals!");
    }
    else{
    history.push({
      pathname: `/search/from=${from}/to=${to}/cabin=${cabin === '' ? null : cabin}/p=${pcount}/fromDate=${fromDate === '' ? null : fromDate}/toDate=${toDate === '' ? null : toDate}`
    }
    );}
   }

  return (
    <Container>
      <Header title={firstName}/>
      <Image4 style={{height: 540, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Motion defaultStyle={{x1: 0, y1:-200, x2: 0, y2:-200,}} style={{x1: spring(1, {stiffness: 40, damping: 25}), y1: spring(140, {stiffness: 40, damping: 17}), x2: spring(1, {stiffness: 30, damping: 27}), y2: spring(140, {stiffness: 30, damping: 27})}}>
        {value => 
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <label style={{fontFamily: 'Arial', fontSize: 40, marginTop: 10, color: '#22272e', marginLeft: 'auto', marginRight: value.y1, opacity: value.x1}}>Welcome to</label>
          <label style={{fontFamily: 'Archivo Black', fontSize: 37, color: 'rgba(240,165,0,1)', marginLeft: 'auto', marginRight: value.y2, opacity: value.x2}}>DUNE AIRLINES</label>
          <Button5
            style={{
              height: 48,
              width: 157,
              marginTop: 40,
              marginLeft: 'auto',
              marginRight: 140
            }}
            title={'Read Moree'}
          />
        </div>
        }
      </Motion>
      </Image4>
      {/* <Image120 src={require("../assets/images/girl.png").default} style={{width: 40, height: 40}}/> */}
      <div style={{width: '80%', backgroundColor: '#fff', alignSelf: 'center', boxShadow: '0px 1px 5px  0.35px #000', marginTop: -50, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', height: 50, width: '100%'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#fff', height: 50, width: '25%', border: '1px solid gray',boxShadow: selected === 'Search' ? '0px 1px 5px  0.35px #000' : hover1, borderBottom: selected === 'Search' ? '4px solid rgba(240,165,0,1)' : '1px solid gray'}} onClick={() => setSelected('Search')} onMouseEnter={() => setHover1('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover1('')}>
                <Image120 src={require("../assets/images/plane-icon-28.png").default} style={{width: 21, height: 21}}/>
                <label style={{fontSize: 20, fontFamily: 'Archivo', marginLeft: 10, cursor: 'pointer'}}>Search Flight</label>
              </div>

              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#fff', height: 50, width: '25%', border: '1px solid gray', boxShadow: selected === 'Manage' ? '0px 1px 5px  0.35px #000' : hover2, borderBottom: selected === 'Manage' ? '4px solid rgba(240,165,0,1)' : '1px solid gray'}} onClick={() => setSelected('Manage')} onMouseEnter={() => setHover2('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover2('')}>
                <Image120 src={require("../assets/images/bookings-2.png").default} style={{width: 21, height: 21}}/>
                <label style={{fontSize: 20, fontFamily: 'Archivo', marginLeft: 10, cursor: 'pointer'}}>Manage Booking</label>
              </div>

              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#fff', height: 50, width: '25%', border: '1px solid gray',boxShadow: selected === 'CheckIn' ? '0px 1px 5px  0.35px #000' : hover3, borderBottom: selected === 'CheckIn' ? '4px solid rgba(240,165,0,1)' : '1px solid gray'}} onClick={() => setSelected('CheckIn')} onMouseEnter={() => setHover3('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover3('')}>
                <Image120 src={require("../assets/images/checkin.png").default} style={{width: 25, height: 25}}/>
                <label style={{fontSize: 20, fontFamily: 'Archivo', marginLeft: 10, cursor: 'pointer'}}>Check In</label>
              </div>

              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#fff', height: 50, width: '25%', border: '1px solid gray',boxShadow: selected === 'Hotel' ? '0px 1px 5px  0.35px #000' : hover4, borderBottom: selected === 'Hotel' ? '4px solid rgba(240,165,0,1)' : '1px solid gray'}} onClick={() => setSelected('Hotel')} onMouseEnter={() => setHover4('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover4('')}>
                <Image120 src={require("../assets/images/hotel.png").default} style={{width: 22, height: 21}}/>
                <label style={{fontSize: 20, fontFamily: 'Archivo', marginLeft: 10, cursor: 'pointer'}}>Hotels</label>
              </div>
            </div>
            {selected === 'Search' ?
              <div style={{height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', height: 60, backgroundColor: '#f0f4ff', width: '93%', alignSelf: 'center', border: '2px solid #406dc0', alignItems: 'center'}}>
                  <Image120 src={require("../assets/images/globe-2.png").default} style={{width: 24, height: 28, marginLeft: 20}}/>
                  <label style={{color: '#406dc0', fontFamily: 'Archivo', fontSize: 20, marginLeft: 10}}>Visit our COVID-19 hub for current destinations, travel advice and more.</label>
                  <Button6 style={{width: 180, height: 30, marginLeft: 'auto', marginRight: 20}} title={'Go to Covid-19 Hub'}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
                  <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: 170, marginLeft: 25}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Departure Airport</label>
                    <input value={from} onChange={(e) => setFrom(e.target.value)} style={{height: 40, width: '100%', fontSize: 20, borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '2px solid #F0A500', color: '#000'}}/>
                  </div>
                  <Image120 style={{height: 40, width: 45, marginLeft: 20, marginTop: 25}} src={require("../assets/images/2arrow.png").default}></Image120>
                  <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: 170, marginLeft: 25}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Arrival Airport</label>
                    <input value={to} onChange={(e) => setTo(e.target.value)} style={{height: 40, width: '100%', fontSize: 20, borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '2px solid #F0A500', color: '#000'}}/>
                  </div>
                  <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: 190, marginLeft: 25}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Depart Date</label>
                    <input
                      type='date'
                      value={fromDate}
                      placeholder={'Fromdate'}
                      style={{
                        height: 40,
                        width: '100%',
                        backgroundColor: '#fff',
                        borderTop: 'none',
                        borderRight: 'none',
                        borderLeft: 'none',
                        borderBottom: '2px solid #F0A500',
                        color: '#000',
                      }}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: 190, marginLeft: 25}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Return Date</label>
                    <input
                      type='date'
                      value={toDate}
                      placeholder={'Todate'}
                      style={{
                        height: 40,
                        width: '100%',
                        borderTop: 'none',
                        borderRight: 'none',
                        borderLeft: 'none',
                        borderBottom: '2px solid #F0A500',
                        color: '#000',
                      }}
                      onChange={(e) => setToDate(e.target.value)}
                      />
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 30, justifyContent: 'center'}}>
                  <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: 170, marginLeft: 25}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Number of Adults</label>
                    <input type={'number'} value={adults} onChange={(e) => setAdults(e.target.value)} style={{height: 40, width: '100%', fontSize: 20, borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '2px solid #F0A500', color: '#000'}}/>
                  </div>
                  <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: 200, marginLeft: 25}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Number of Children</label>
                    <input type={'number'} value={children} onChange={(e) => setChildren(e.target.value)} style={{height: 40, width: '100%', fontSize: 20, borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '2px solid #F0A500', color: '#000'}}/>
                  </div>
                  <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: 170, marginLeft: 25}}>
                    <label style={{color: '#F0A500', fontFamily: 'Archivo Black'}}>Cabin</label>
                    <input value={cabin} onChange={(e) => setCabin(e.target.value)} style={{height: 40, width: '100%', fontSize: 20, borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '2px solid #F0A500', color: '#000'}}/>
                  </div>
                  <Image35
                    style={{background: hover6, width: 50, height: 50, marginLeft: 20, marginTop: 5}}
                    onMouseEnter={() => setHover6('rgba(207,117,0,1)')} 
                    onMouseLeave={() => setHover6('rgba(240,165,0,1)')} 
                    src={require("../assets/images/search.png").default}
                    onClick={handle}
                  ></Image35>
                </div>
              </div>
              :
            null}
            {selected === 'Manage' ?
              <div style={{height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <label onClick={() => firstName ? history.push('/profile/bookings') : null} style={{fontFamily: 'Archivo', fontSize: 17, color: hover5, cursor: 'pointer', textDecorationLine: 'underline', marginLeft: 40}} onMouseEnter={() => setHover5('rgba(207,117,0,1)')} onMouseLeave={() => setHover5('rgba(240,165,0,1)')}>{firstName ? 'View your trips' : 'Login to view your trips'}</label>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                  <input style={{height: 50, width: 250, fontSize: 20, marginLeft: 40}} placeholder="Last Name"/>
                  <input style={{height: 50, width: 250, fontSize: 20, marginLeft: 20}} placeholder="Booking Number"/>
                  <Button7 style={{height: 50, width: 250, marginLeft: 'auto', marginRight: 20}} title={'Manage Booking'}/>
                </div>
              </div>
              :
            null}
            {selected === 'CheckIn' ?
              <div style={{height: 120, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <input style={{height: 50, width: 250, fontSize: 20, marginLeft: 40}} placeholder="Last Name"/>
                  <input style={{height: 50, width: 250, fontSize: 20, marginLeft: 20}} placeholder="Booking Number"/>
                  <Button7 style={{height: 50, width: 250, marginLeft: 'auto', marginRight: 20}} title={'Check In'}/>
              </div>
              :
            null}
      </div>
    
      <LoremIpsum3 style={{textAlign: 'center'}}>THE DUNE CUSTOMER EXPERIENCE</LoremIpsum3>
      <LoremIpsum4 style={{textAlign: 'center'}}>Supporting You Through Your Travel Journey</LoremIpsum4>
      
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '33.33%', alignItems: 'center'}}>
          <Image5 src={require("../assets/images/43687521.png").default}></Image5>
          <Rect2 style={{marginTop: 20}}>
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
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33.33%', alignItems: 'center'}}>
          <Image6 src={require("../assets/images/30501287.png").default}></Image6>
          <Rect3 style={{marginTop: 20}}>
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
              onClick={() => (firstName ? history.push('/profile/bookings') : null)}
            />
          </Rect3>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33.33%', alignItems: 'center'}}>
          <Image7 src={require("../assets/images/bell.png").default}></Image7>
          <Rect4 style={{marginTop: 20}}>
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
              onClick={() => firstName ? null : history.push('/signup')}
            />
          </Rect4>
        </div>
      </div>

      <Image3 style={{marginTop: 40, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <label style={{color: '#FFF', fontFamily: 'Archivo', fontSize: 15, marginTop: 70}}>SPECIAL OFFER</label>
        <label style={{color: '#FFF', fontFamily: 'Archivo', fontSize: 34, marginTop: 10}}>Your top 5 Egypt experiences on us</label>
        <div style={{width: 300, height: 3, backgroundColor: 'rgba(240,165,0,1)', marginTop: 17}} />
        <label style={{color: '#FFF', fontFamily: 'Archivo', fontSize: 22, marginTop: 20}}>Fly to Egypt and get complimentary visit to El Gouna, The Pyramids, and more</label>
        <Button1
          style={{
            height: 48,
            width: 177,
            marginTop: 100,
          }}
          title={'Learn More'}
        />
      </Image3>
      
      <div style={{height: 880, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <label style={{fontSize: 22, fontFamily: 'Archivo Black', marginTop: 20}}>Featured Destinations</label>
          <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
            <div style={{display: 'flex', flexDirection: 'column', width: 550, height: 350, boxShadow: hover7, cursor: 'pointer', border: '1px solid gray', alignItems: 'center'}} onMouseEnter={() => setHover7('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover7('')}>
              <Image120 src={require("../assets/images/sample.jpg").default} style={{width: 550, height: 180}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 13, marginTop: 15, cursor: 'pointer'}}>U N I T E D &nbsp; K I N G D O M</label>
              <label style={{fontFamily: 'Archivo', fontSize: 22, marginTop: 15, cursor: 'pointer'}}>London</label>
              <label style={{fontFamily: 'Archivo Black', fontSize: 18, marginTop: 'auto', marginBottom: 20, cursor: 'pointer'}}>Discover for yourself</label>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',marginLeft: 40, width: 550, height: 350, boxShadow: hover8, cursor: 'pointer', border: '1px solid gray', alignItems: 'center'}} onMouseEnter={() => setHover8('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover8('')}>
              <Image120 src={require("../assets/images/sample2.jpg").default} style={{width: 550, height: 180}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 13, marginTop: 15, cursor: 'pointer'}}>M A L D I V E S</label>
              <label style={{fontFamily: 'Archivo', fontSize: 22, marginTop: 15, cursor: 'pointer'}}>Male</label>
              <label style={{fontFamily: 'Archivo Black', fontSize: 18, marginTop: 'auto', marginBottom: 20, cursor: 'pointer'}}>Discover for yourself</label>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
            <div style={{display: 'flex', flexDirection: 'column', width: 550, height: 350, boxShadow: hover9, cursor: 'pointer', border: '1px solid gray', alignItems: 'center'}} onMouseEnter={() => setHover9('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover9('')}>
              <Image120 src={require("../assets/images/sample3.jpg").default} style={{width: 550, height: 180}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 13, marginTop: 15, cursor: 'pointer'}}>G E R M A N Y</label>
              <label style={{fontFamily: 'Archivo', fontSize: 22, marginTop: 15, cursor: 'pointer'}}>Berlin</label>
              <label style={{fontFamily: 'Archivo Black', fontSize: 18, marginTop: 'auto', marginBottom: 20, cursor: 'pointer'}}>Discover for yourself</label>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',marginLeft: 40, width: 550, height: 350, boxShadow: hover10, cursor: 'pointer', border: '1px solid gray', alignItems: 'center'}} onMouseEnter={() => setHover10('0px 1px 5px  0.35px #000')} onMouseLeave={() => setHover10('')}> 
              <Image120 src={require("../assets/images/sample4.jpg").default} style={{width: 550, height: 180}}/>
              <label style={{fontFamily: 'Archivo', fontSize: 13, marginTop: 15, cursor: 'pointer'}}>E G Y P T</label>
              <label style={{fontFamily: 'Archivo', fontSize: 22, marginTop: 15, cursor: 'pointer'}}>Sharm El Sheikh</label>
              <label style={{fontFamily: 'Archivo Black', fontSize: 18, marginTop: 'auto', marginBottom: 20, cursor: 'pointer'}}>Discover for yourself</label>
            </div>
          </div>
          <Button6 style={{width: 200, height: 40, marginTop: 40}} title={'More Destinations'}/>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image3 = styled.div`
  background-image: url(${require("../assets/images/425451.jpg").default});
  background-size: cover;
`;

const Image4 = styled.div`
  background-image: url(${require("../assets/images/dune-plane.jpg").default});
  background-size: cover;
`;

const Image35 = styled.img`
  border-radius: 100px;
  cursor: pointer;
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
  width: 385px;
  height: 170px;
  object-fit: contain;
`;

const Image6 = styled.img`
  width: 385px;
  height: 170px;
  object-fit: contain;
`;

const Image7 = styled.img`
  width: 385px;
  height: 170px;
  object-fit: contain;
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


export default HomeScreen;