import React, {useState} from "react";
import styled from "styled-components";

function ProfileCard(props) {

  const [hover, setHover] = useState('transparent');

  return (
    <Container
      onMouseEnter={() => setHover('rgba(207,117,0,1)')} 
      onMouseLeave={() => setHover('transparent')}
      style={{...props.style, background: hover, height: 60, width: 140, marginLeft: '62%', marginTop: 20}}
      onClick={props.onClick}  
    >
        <Image2
            src={require("../assets/images/profile-icon.png").default}
        ></Image2>
        <Admin
            style={{
                color: hover === 'transparent' ? 'rgba(240,165,0,1)' : 'rgba(244, 244, 244,1)'
              }}
        >{props.title}</Admin>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  background-color: transparent;
  border-radius: 20px;
  align-items: center;
  flex-direction: row;
`;

const Image2 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const Admin = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  margin-left: 9px;
`;

export default ProfileCard;
