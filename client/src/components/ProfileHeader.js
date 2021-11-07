import React from "react";
import ProfileCard from "./ProfileCard";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function ProfileHeader(props) {
    
    const history = useHistory();

  return (
    <div style={{height: 100, backgroundColor: '#000', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <div style={{cursor: 'pointer', flexDirection: 'row', display: 'flex', marginLeft: 50, alignItems: 'center'}} onClick={() => history.push('/admin')}>
            <Image4 src={require("../assets/images/logo3.png").default}></Image4>
            <DuneAirlines>DUNE</DuneAirlines>
        </div>
        <ProfileCard
          title={props.title}
        />
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
