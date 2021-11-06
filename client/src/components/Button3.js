import React, { useState } from "react";

function Button3(props) {
  const [hover, setHover] = useState('rgba(0,153,0,1)');

  return (
    <div
      onMouseEnter={() => setHover('rgba(0,102,0,1)')} 
      onMouseLeave={() => setHover('rgba(0,153,0,1)')} 
      onClick={props.onClick}
      style={{...props.style, background: hover, cursor: 'pointer', borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 1px 5px  0.35px #000'}}
    >
      <text style={{fontFamily: 'Archivo', fontSize: 20, color: 'rgba(244,244,244,1)'}}>{props.title}</text>
    </div>
  );
}

export default Button3;
