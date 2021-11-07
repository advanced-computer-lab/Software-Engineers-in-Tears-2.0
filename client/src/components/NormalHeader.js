import React from "react";
import styled from "styled-components";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import { useHistory } from "react-router-dom";

function ProfileHeader(props) {
    
    const history = useHistory();

  return (
    <div style={{height: 100, backgroundColor: '#000', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <div style={{cursor: 'pointer', flexDirection: 'row', display: 'flex', marginLeft: 50, alignItems: 'center'}} onClick={() => history.push('/')}>
            <Image4 src={require("../assets/images/logo3.png").default}></Image4>
            <DuneAirlines>DUNE</DuneAirlines>
        </div>
        <div style={{flexDirection: 'row', display: 'flex', position: 'absolute', right: 50}}>
            <Button2
                style={{
                height: 40,
                width: 100,
                }}
                title={'LOG IN'}
                onClick={() => history.push("/login")}
            />
            <Button1
                style={{
                height: 40,
                width: 100,
                marginLeft: 20
                }}
                title={'SIGN UP'}
            />
        </div>
    </div>
  );
}

const Image4 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const DuneAirlines = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 30px;
  margin-left: 10px;
`;

export default ProfileHeader;
