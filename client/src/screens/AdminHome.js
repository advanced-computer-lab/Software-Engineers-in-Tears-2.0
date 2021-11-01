import React, { Component } from "react";
import styled, { css } from "styled-components";
import Button1 from "../components/Button1";
import { useHistory } from "react-router-dom";

function AdminHome(props) {

    const history = useHistory();

  return (
    <Container>
    <Rect>
        <Image4Row style={{cursor: 'pointer'}} onClick={() => history.push('/admin')}>
            <Image4 src={require("../assets/images/logo3.png").default}></Image4>
            <DuneAirlines>DUNE</DuneAirlines>
        </Image4Row>
        <Row2>
            <Image2
                src={require("../assets/images/profile-icon.png").default}
            ></Image2>
            <Admin>Admin</Admin>
        </Row2>
    </Rect>
    <Button1
        title={'Create Flight'}
        style={{
            height: 58,
            width: 207,
            marginTop: 50,
            marginLeft: 550 
        }}
    />
    <Button1
        title={'Update Flight'}
        style={{
            height: 58,
            width: 207,
            marginTop: 50,
            marginLeft: 550 
        }}
    />
    <Button1
        title={'Delete Flight'}
        style={{
            height: 58,
            width: 207,
            marginTop: 50,
            marginLeft: 550 
        }}
    />
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
  height: 69px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 68px;
  margin-left: 50px;
  margin-top: 33px;
`;
const Row2 = styled.div`
  height: 69px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 68px;
  margin-left: -90px;
  margin-top: 33px;
`;

const Image2 = styled.img`
  width: 45px;
  height: 45px;
  margin-left: 887px;
  margin-top: -8px;
  object-fit: contain;
`;

const Admin = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(240,165,0,1);
  font-size: 25px;
  margin-left: 11px;
  margin-top: 2px;
`;


export default AdminHome;
