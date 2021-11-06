import React, { useState } from "react";

function Button1(props) {
  const [hover, setHover] = useState('rgba(240,165,0,1)');

  return (
    <div
      onMouseEnter={() => setHover('rgba(207,117,0,1)')} 
      onMouseLeave={() => setHover('rgba(240,165,0,1)')}
      onClick={props.onClick}
      style={{...props.style, background: hover, cursor: 'pointer', borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 1px 5px  0.35px #000'}}
    >
      <text style={{fontFamily: 'Archivo', fontSize: props.style.fontSize||20, color: props.style.color||'rgba(244,244,244,1)'}}>{props.title}</text>
    </div>
  );
}

export default Button1;
