import React, { useState } from "react";
import styled from "styled-components";

function Button1(props) {
  const [hover, setHover] = useState('rgba(240,165,0,1)');

  return (
    <Container 
      onMouseEnter={() => setHover('rgba(207,117,0,1)')} 
      onMouseLeave={() => setHover('rgba(240,165,0,1)')} 
      onClick={props.onClick}
      style={{...props.style, background: hover}}
    >
      <SignUp>{props.title}</SignUp>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  cursor: pointer;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const SignUp = styled.span`
  font-family: Archivo;
  color: rgba(244,244,244,1);
  font-size: 20px;
`;

export default Button1;
