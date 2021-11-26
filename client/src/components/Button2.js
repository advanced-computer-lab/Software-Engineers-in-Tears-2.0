import React, {useState} from "react";

function Button2(props) {

  const [hover, setHover] = useState('transparent');

  return (
    <div
      onMouseEnter={() => setHover('rgba(207,117,0,1)')} 
      onMouseLeave={() => setHover('transparent')}
      onClick={props.onClick}
      style={{...props.style, background: hover, cursor: 'pointer', borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
    >
      <label style={{fontFamily: 'Archivo', fontSize: 20,  color: hover === 'transparent' ? 'rgba(240,165,0,1)' : 'rgba(244, 244, 244,1)', cursor: 'pointer'}}>{props.title}</label>
    </div>
  );
}

export default Button2;
