import React, { useState } from "react";
import styled from "styled-components";

function Button5(props) {
  const [hover, setHover] = useState('rgba(240,165,0,1)');

  return (
    <div
      onMouseEnter={() => setHover('rgba(207,117,0,1)')} 
      onMouseLeave={() => setHover('rgba(240,165,0,1)')}
      onClick={props.disabled ? null : props.onClick}
      style={{...props.style, background: props.disabled ? 'rgba(220,220,220,1)' : hover, cursor: props.disabled? 'default': 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 1px 5px  0.35px #000'}}
    >
      <label style={{fontFamily: 'Archivo', fontSize: props.style.fontSize||20, color: props.style.color||'rgba(244,244,244,1)', cursor: props.disabled? 'default': 'pointer'}}>{props.title}</label>
      <Logo src={require("../assets/images/greater.png").default} style={{width: 25, height: 20, marginLeft: 10}}/>
    </div>
  );
}

const Logo = styled.img`
`;

export default Button5;
