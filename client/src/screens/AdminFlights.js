import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';
import { useHistory } from "react-router-dom"; 
import Button1 from "../components/Button1";
import ProfileCard from "../components/ProfileCard";

function AdminFlights(props) {

  const history = useHistory();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if(props.location.showAll){
      axios
        .get('http://localhost:8000/adminflights')
        .then(res => {
          setFlights(res.data);
        })
        .catch(err =>{
          console.log(err);
        })
    }
    else{
      axios
        .post('http://localhost:8000/adminsearchflights', props.location.flightData)
        .then(res => {
          setFlights(res.data);
        })
        .catch(err =>{
          console.log(err);
        })
    }
  });

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
    <table>
    <thead>
      <tr>
        <th>From</th>
        <th>To</th>
        <th>Flight Date</th>
        <th>Cabin</th>
        <th>Seats Available</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {flights.map((flight) =>(
        <tr>
          <td>{flight.From}</td>
          <td>{flight.To}</td>
          <td>{flight.Flight_Date}</td>
          <td>{flight.Cabin}</td>
          <td>{flight.Seats_Available_on_Flight}</td>
          <td><Button1 title={'Update'} style={{width: 30, height: 30}}/></td>
          <td><Button1 title={'Delete'} style={{width: 30, height: 30}}/></td>
        </tr>
      ))}
    </tbody>
    </table>
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


export default AdminFlights;
