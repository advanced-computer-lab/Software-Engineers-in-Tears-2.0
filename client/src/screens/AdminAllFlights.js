import React, {useEffect} from "react";
import styled from "styled-components";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

function AdminAllFlights(props) {

  const history = useHistory();

  useEffect(() => {
    console.log('entered')
    axios
        .get('http://localhost:8000/adminflights')
        .then(res => {
            console.log(res)
        })
        .catch(err =>{
            console.log(err);
        })
  }, []);

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


export default AdminAllFlights;
