import React from 'react';
import styled from "styled-components";
import Button2 from "../components/Button2";
import Button1 from "../components/Button1";
import { useHistory } from "react-router-dom";
//import axios from 'axios';

function LoginScreen() {

  const history = useHistory();

  return (
    <Container>
      <Rect>
        <Image4Row style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
            <Image4 src={require("../assets/images/logo3.png").default}></Image4>
            <DuneAirlines>DUNE</DuneAirlines>
        </Image4Row>
        <Row2>
          <Button2
            style={{
              height: 36,
              width: 100,
              marginLeft: 850
            }}
            title={'LOG IN'}
            onClick={() => history.push("/login")}
          />
          <Button1
            style={{
              height: 36,
              width: 100,
              marginLeft: 13
            }}
            title={'SIGN UP'}
          />
        </Row2>
      </Rect>
      <h1>Login Screen</h1>
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
  flex: 1 1 0%;
  margin-right: 100px;
  margin-left: 50px;
  margin-top: 37px;
`;
const Row2 = styled.div`
  height: 69px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 68px;
  margin-left: -120px;
  margin-top: 33px;
`;

export default LoginScreen;