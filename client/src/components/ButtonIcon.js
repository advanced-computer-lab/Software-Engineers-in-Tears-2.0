import React, { useState } from "react";
import styled from "styled-components";

function ButtonIcon(props) {
  const [hover, setHover] = useState('rgba(240,165,0,1)');
  const [hover2, setHover2] = useState('#000');
  const path = useState(props.path.toString())[0];
  //console.log(path)

  return (
    <div
      onMouseEnter={() => {setHover('rgba(207,117,0,1)'); setHover2('rgba(240,165,0,1)')}} 
      onMouseLeave={() => {setHover('rgba(240,165,0,1)'); setHover2('#000')}}
      onClick={props.disabled ? null : props.onClick}
      style={{...props.style, background: props.selected ? hover : hover2, cursor: 'pointer',  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
    >
      <Image2
        src={require('../assets/images/'+path+'.png').default}
        style={{width: 30, height: 30, position: 'absolute', left: 25}}
      />
      <label style={{fontFamily: 'Archivo', fontSize: props.style.fontSize||20, color: props.style.color||'rgba(244,244,244,1)', cursor: 'pointer'}}>{props.title}</label>
    </div>
  );
}

const Image2 = styled.img`
`;

export default ButtonIcon;
