import React from "react";

function Footer(props) {

  return (
    <div
      style={{background: '#000000', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60, marginTop: 35}}
    >
      <text style={{fontFamily: 'Archivo', fontSize: 15, color: 'rgba(244,244,244,1)'}}>© DUNE AIRLINES. ALL RIGHTS RESERVED.</text>
    </div>
  );
}

export default Footer;
