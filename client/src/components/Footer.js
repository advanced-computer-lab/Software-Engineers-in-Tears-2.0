import React from "react";

function Footer(props) {

  return (
    <div
      style={{background: '#000000', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60, marginTop: props.marginTop||35}}
    >
      <label style={{fontFamily: 'Archivo', fontSize: 15, color: 'rgba(244,244,244,1)'}}>© DUNE AIRLINES. ALL RIGHTS RESERVED.</label>
    </div>
  );
}

export default Footer;
