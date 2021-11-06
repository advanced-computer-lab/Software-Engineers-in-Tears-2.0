import React, {useState} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Button1 from "../components/Button1";
import Footer from "../components/Footer";

function AdminHome(props) {

  const history = useHistory();
  const [hover1, setHover1] = useState('rgba(240,165,0,1)');
  const [hover2, setHover2] = useState('rgba(240,165,0,1)');
  const [flightNumber, setFlightNumber] = useState('');
  const [airportTerminal, setAirportTerminal] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [flightDate, setFlightDate] = useState('');

   function handle(event){
    event.preventDefault();
    history.push({
      pathname: '/admin/flights',
      showAll: false,
      flightData: {
        FlightNumber: flightNumber, 
        DepartureTime: departureTime,
        ArrivalTime: arrivalTime,
        Flight_Date: Date.parse(flightDate+'T22:00:00.000+00:00'),
        AirportTerminal: airportTerminal,
      }
    });
   }

  return (
    <Container>
    <Rect>
        <Image4Row style={{cursor: 'pointer'}} onClick={() => history.push('/admin')}>
            <Image4 src={require("../assets/images/logo3.png").default}></Image4>
            <DuneAirlines>DUNE</DuneAirlines>
        </Image4Row>
        <ProfileCard
          title={'Admin'}
        />
    </Rect>
    <Rect2>
        <SearchFlight>SEARCH FLIGHT</SearchFlight>
        <MaterialFixedLabelTextboxRow>  
        <input
            type='text'
            value={flightNumber}
            placeholder={'Flight Number'}
            style={{
              height: 43,
              width: 192,
              marginTop: 7
            }}
            onChange={(e) => setFlightNumber(e.target.value)}
           /> 
          <input
            style={{
              height: 43,
              width: 159,
              marginLeft: 20,
              marginTop: 7
            }}
            placeholder={'Airport Terminal'}
            value={airportTerminal}
            onChange={(e) => setAirportTerminal(e.target.value)}
          ></input>
          <input
            style={{
              height: 43,
              width: 235,
              marginLeft: 20,
              marginTop: 7
            }}
            placeholder={'Departure Time'}
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          ></input>
          <input
            style={{
              height: 43,
              width: 235,
              marginLeft: 20,
              marginTop: 7
            }}
            placeholder={'Arrival Time'}
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          ></input>
          <input
            type='date'
            style={{
              height: 43,
              width: 182,
              marginLeft: 20,
              marginTop: 7
            }}
            placeholder={'Flight Date'}
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
          ></input>
          <Image3
            style={{background: hover1, position: 'absolute', right: 55}}
            onMouseEnter={() => setHover1('rgba(207,117,0,1)')} 
            onMouseLeave={() => setHover1('rgba(240,165,0,1)')} 
            src={require("../assets/images/search.png").default}
            onClick={handle}
          ></Image3>
        
        </MaterialFixedLabelTextboxRow>
        <Or5Row>
          <Or5>OR</Or5>
          <LoremIpsum3
            style={{color: hover2, cursor: "pointer"}}
            onMouseEnter={() => setHover2('rgba(207,117,0,1)')} 
            onMouseLeave={() => setHover2('rgba(240,165,0,1)')}
            onClick={() => history.push({
              pathname: '/admin/flights',
              showAll: true,
            })}
          >List all availaible flights</LoremIpsum3>
        </Or5Row>
      </Rect2>
      <div style={{height: 300, display: 'flex', flexDirection: 'row'}}>
        <Image
          style={{width: 150, height: 150, alignSelf: 'center', marginLeft: 50}} 
          src={require("../assets/images/add-flight.png").default}
        />
        <div style={{height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 50, marginTop: 10}}>
            <text style={{fontFamily: 'Archivo Black', fontSize: 30, color: '#000000', marginTop: -30}}>WANT TO ADD A NEW FLIGHT?</text>
            <Button1 
              title={'Create Flight'}
              onClick={() => history.push('/admin/create')}
              style={{
                width: 200,
                height: 50,
                marginTop: 20
              }}
            />
        </div>
      </div>
      <Footer/>
    </Container>

  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect = styled.div`
  height: 100px;
  background-color: rgba(0,0,0,1);
  flex-direction: row;
  display: flex;
`;

const Rect2 = styled.div`
  height: 277px;
  background-color: rgba(0,0,0,1);
  border-top: 1px solid rgba(60,60,60,1);
  flex-direction: column;
  display: flex;
`;

const SearchFlight = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 39px;
  margin-top: 27px;
  margin-left: 50px;
`;

const Image3 = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 100px;
  cursor: pointer;
`;
const Image = styled.img`

`;

const MaterialFixedLabelTextboxRow = styled.div`
  height: 58px;
  flex-direction: row;
  display: flex;
  margin-top: 31px;
  margin-left: 50px;
  margin-right: 81px;
`;

const Or5 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 30px;
`;

const LoremIpsum3 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  text-decoration-line: underline;
  font-size: 27px;
  margin-left: 23px;
  margin-top: 7px;
`;

const Or5Row = styled.div`
  height: 40px;
  flex-direction: row;
  display: flex;
  margin-top: 37px;
  margin-left: 50px;
`;

const Image4 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-top: -10px;
`;

const DuneAirlines = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 30px;
  margin-left: 10px;
`;

const Image4Row = styled.div`
  height: 49px;
  flex-direction: row;
  display: flex;
  margin-right: 100px;
  margin-left: 50px;
  margin-top: 37px;
`;


export default AdminHome;
