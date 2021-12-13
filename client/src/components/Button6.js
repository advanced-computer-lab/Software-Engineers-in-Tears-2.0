import React, { useState } from "react";

function Button6(props) {
  const [hover, setHover] = useState('');

  return (
    <div
      onMouseEnter={() => setHover('0px 1px 5px  0.35px #000')} 
      onMouseLeave={() => setHover('')}
      onClick={props.disabled ? null : props.onClick}
      style={{...props.style, background: '#fff' , cursor: props.disabled? 'default': 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '2px solid #000', boxShadow: hover}}
    >
      <label style={{fontFamily: 'Archivo', fontSize: props.style.fontSize||17, color: props.style.color||'#000', cursor: props.disabled? 'default': 'pointer'}}>{props.title}</label>
    </div>
  );
}

export default Button6;
