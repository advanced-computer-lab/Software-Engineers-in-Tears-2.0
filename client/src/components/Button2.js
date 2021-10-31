import React, {useState} from "react";
import styled from "styled-components";

function Button2(props) {

  const [hover, setHover] = useState('transparent');

  return (
    <Container
      onMouseEnter={() => setHover('rgba(207,117,0,1)')} 
      onMouseLeave={() => setHover('transparent')}
      style={{...props.style, background: hover}}
      onClick={props.onClick}  
    >
      <LogIn
        style={{
          color: hover === 'transparent' ? 'rgba(240,165,0,1)' : 'rgba(244, 244, 244,1)'
        }}
      >{props.title}</LogIn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
  flex-direction: row;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
`;

const LogIn = styled.span`
  font-family: Archivo;
  font-size: 20px;
`;

export default Button2;
