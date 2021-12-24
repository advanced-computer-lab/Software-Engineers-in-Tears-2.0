import React, {useState} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function AdminHeader(props) {
    
  const history = useHistory();

  const [hover7, setHover7] = useState('#F0A500');
  const [hover8, setHover8] = useState('#000');

  return (
    <div style={{height: 58, backgroundColor: '#000', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 50}} onClick={() => history.push('/admin')}>
        <Logo src={require("../assets/images/logo3.png").default} style={{width: 40, height: 40}}/>
        <label style={{color: '#fff', fontFamily: 'Archivo', marginLeft: 10, fontSize: 20, cursor: 'pointer'}}>Dune</label>
      </div>
      <label onClick={() => {localStorage.clear(); history.push('/')}} onMouseEnter={() => setHover7('#CF7500')} onMouseLeave={() => setHover7('#F0A500')} style={{fontFamily: 'Archivo', color: hover7, textDecorationLine: 'underline', marginLeft: 20, cursor: 'pointer'}}>Log Out</label>
      <div onMouseEnter={() => setHover8('rgba(50,50,50,1)')} onMouseLeave={() => setHover8('#000')} style={{height: 58, width: 100, cursor: 'pointer', backgroundColor: hover8, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 50}} onClick={() => history.push('/admin')}>
        <Logo src={require("../assets/images/profile-icon2.png").default} style={{width: 25, height: 24}}/>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer', marginLeft: 7}}>{props.title}</label>
      </div>
    </div>
  );
}

const Logo = styled.img`
`;

export default AdminHeader;
