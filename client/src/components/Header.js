import React, {useState} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function Header(props) {
    
  const history = useHistory();

  const [hover1, setHover1] = useState('#000');
  const [hover2, setHover2] = useState('#000');
  const [hover3, setHover3] = useState('#000');
  const [hover4, setHover4] = useState('#000');
  const [hover5, setHover5] = useState('#000');
  const [hover6, setHover6] = useState('#000');
  const [hover7, setHover7] = useState('#000');
  const [hover8, setHover8] = useState('#000');
  const [hover9, setHover9] = useState('#000');

  return (
    <div style={{height: 58, backgroundColor: '#000', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 50}} onClick={() => history.push('/')}>
        <Logo src={require("../assets/images/logo3.png").default} style={{width: 40, height: 40}}/>
        <label style={{color: '#fff', fontFamily: 'Archivo', marginLeft: 10, fontSize: 20, cursor: 'pointer'}}>DUNE</label>
      </div>
      <div onMouseEnter={() => setHover1('rgba(50,50,50,1)')} onMouseLeave={() => setHover1('#000')} style={{height: '100%', width: 70, cursor: 'pointer', backgroundColor: hover1, marginLeft: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer'}}>BOOK</label>
      </div>
      <div onMouseEnter={() => setHover2('rgba(50,50,50,1)')} onMouseLeave={() => setHover2('#000')} style={{height: '100%', width: 90, cursor: 'pointer', backgroundColor: hover2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer'}}>MANAGE</label>
      </div>
      <div onMouseEnter={() => setHover3('rgba(50,50,50,1)')} onMouseLeave={() => setHover3('#000')} style={{height: '100%', width: 110, cursor: 'pointer', backgroundColor: hover3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer'}}>EXPERIENCE</label>
      </div>
      <div onMouseEnter={() => setHover4('rgba(50,50,50,1)')} onMouseLeave={() => setHover4('#000')} style={{height: '100%', width: 130, cursor: 'pointer', backgroundColor: hover4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer'}}>WHERE WE FLY</label>
      </div>
      <div onMouseEnter={() => setHover5('rgba(50,50,50,1)')} onMouseLeave={() => setHover5('#000')} style={{height: '100%', width: 100, cursor: 'pointer', backgroundColor: hover5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer'}}>LOYALTY</label>
      </div>
      <div onMouseEnter={() => setHover6('rgba(50,50,50,1)')} onMouseLeave={() => setHover6('#000')} style={{height: '100%', width: 70, cursor: 'pointer', backgroundColor: hover6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer'}}>HELP</label>
      </div>

      <div onMouseEnter={() => setHover7('rgba(50,50,50,1)')} onMouseLeave={() => setHover7('#000')} style={{height: 58, width: 70, cursor: 'pointer', backgroundColor: hover7, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 190}}>
        <Logo src={require("../assets/images/globe.png").default} style={{width: 16, height: 18}}/>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer', marginLeft: 10}}>EG</label>
      </div>
      <div onMouseEnter={() => setHover9('rgba(50,50,50,1)')} onMouseLeave={() => setHover9('#000')} style={{height: 58, width: 40, cursor: 'pointer', backgroundColor: hover9, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 150}}>
        <Logo src={require("../assets/images/search-2.png").default} style={{width: 25, height: 25}}/>
      </div>
      <div onMouseOver={() => setHover8('rgba(50,50,50,1)')} onMouseLeave={() => setHover8('#000')} style={{height: 58, width: 100, cursor: 'pointer', backgroundColor: hover8, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 50}} onClick={() => props.title ? history.push('/profile/home') : history.push('/login')}>
        {props.selected === 'Name' ? <div style={{position: 'absolute', top: 0, width: '100%', height: 5, backgroundColor: '#F0A500'}} /> : null}
        <Logo src={require("../assets/images/profile-icon2.png").default} style={{width: 25, height: 24}}/>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 13, cursor: 'pointer', marginLeft: 7}}>{props.title ? props.title : 'LOG IN'}</label>
      </div>
    </div>
  );
}

const Logo = styled.img`
`;

export default Header;
