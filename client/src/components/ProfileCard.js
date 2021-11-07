import React, {useState} from "react";
import styled from "styled-components";

function ProfileCard(props) {

  const [hover, setHover] = useState('transparent');

  return (
    <div
      onMouseEnter={() => setHover('rgba(207,117,0,1)')} 
      onMouseLeave={() => setHover('transparent')}
      style={{background: hover, height: 60, width: 140,  position: 'absolute', right: 50, cursor: 'pointer', borderRadius: 20, display: 'flex', flexDirection: 'row', alignItems: 'center'}}
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
    </div>
  );
}

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
