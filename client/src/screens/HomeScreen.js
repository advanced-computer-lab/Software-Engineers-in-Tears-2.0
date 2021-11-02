import React from "react";
import styled from "styled-components";
import Button2 from "../components/Button2";
import Button1 from "../components/Button1";
import { useHistory } from "react-router-dom";
//import axios from 'axios';

function HomeScreen(props) {

  const history = useHistory();

  return (
    <Container>
      <Rect>
        <Image4Row style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
            <Image4 src={require("../assets/images/logo3.png").default}></Image4>
            <DuneAirlines>DUNE</DuneAirlines>
        </Image4Row>
        <Row2>
          <Button2
            style={{
              height: 36,
              width: 100,
              marginLeft: 850
            }}
            title={'LOG IN'}
            onClick={() => history.push("/login")}
          />
          <Button1
            style={{
              height: 36,
              width: 100,
              marginLeft: 13
            }}
            title={'SIGN UP'}
          />
        </Row2>
      </Rect>
      <Image3>
        <LoremIpsum>REDISCOVER THE JOY<br/>OF TRAVELING</LoremIpsum>
        <LoremIpsum2>
          Find trip inspiration and the latest travel requirements<br/>with Dune Airlines.
        </LoremIpsum2>
        <Button1
          style={{
            height: 58,
            width: 207,
            marginTop: 50,
            marginLeft: 50
          }}
          title={'GET STARTED'}
        />
      </Image3>
      <LoremIpsum3>THE DUNE CUSTOMER EXPERIENCE</LoremIpsum3>
      <LoremIpsum4>Supporting You Through Your Travel Journey</LoremIpsum4>
      <Image5Row>
        <Image5 src={require("../assets/images/43687521.png").default}></Image5>
        <Image6 src={require("../assets/images/30501287.png").default}></Image6>
        <Image7 src={require("../assets/images/bell.png").default}></Image7>
      </Image5Row>
      <Rect2Row>
        <Rect2>
          <LoremIpsum10>WHAT IS THE CURRENT<br/>FLIGHT SCHEDULE?</LoremIpsum10>
          <LoremIpsum11>
            Flight impacted due to covid? Stay<br/>on top of the flight
            schedule and <br/>follow all the latest updates.
          </LoremIpsum11>
          <Button1
            style={{
              height: 46,
              width: 175,
              marginTop: 86,
              marginLeft: 30
            }}
            title={'VIEW FLIGHTS'}
          />
        </Rect2>
        <Rect3>
          <LoremIpsum5>CAN I CANCEL/CHANGE <br/>MY FLIGHT?</LoremIpsum5>
          <LoremIpsum6>
            We understand you have questions <br/>about our change/cancel
            policy. <br/>Learn more about our tickets, <br/>change fees and
            fare difference <br/>policies.
          </LoremIpsum6>
          <Button1
            style={{
              height: 46,
              width: 201,
              marginTop: 40,
              marginLeft: 30
            }}
            title={'MODIFY FLIGHT'}
          />
        </Rect3>
        <Rect4>
          <LoremIpsum7>WHAT ARE THE LATEST <br/>TRAVEL UPDATES?</LoremIpsum7>
          <LoremIpsum8Stack>
            <LoremIpsum8></LoremIpsum8>
            <LoremIpsum9>
              Information is more important than <br/>ever. We pledge to share
              updates <br/>with you as quickly as possible, <br/>with full
              transparency. Sign up to<br/>stay updated with all the latest
              news.
            </LoremIpsum9>
          </LoremIpsum8Stack>
          <Button1
            style={{
              height: 46,
              width: 166,
              marginTop: 39,
              marginLeft: 37
            }}
            title={'SIGN UP NOW'}
          />
        </Rect4>
      </Rect2Row>
      <Rect5>
        <LoremIpsum13>© DUNE AIRLINES. ALL RIGHTS RESERVED.</LoremIpsum13>
      </Rect5>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect = styled.div`
  height: 100px;
  background-color: rgba(0,0,0,1);
  flex-direction: row;
  display: flex;
`;

const Image4 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-top: -10px;
`;

const DuneAirlines = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 30px;
  margin-left: 10px;
`;

const Image4Row = styled.div`
  height: 49px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 100px;
  margin-left: 50px;
  margin-top: 37px;
`;
const Row2 = styled.div`
  height: 69px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 68px;
  margin-left: -120px;
  margin-top: 33px;
`;

const Image3 = styled.div`
  height: 365px;
  flex-direction: column;
  display: flex;
  background-image: url(${require("../assets/images/425451.jpg").default});
  background-size: cover;
`;

const LoremIpsum = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 38px;
  margin-top: 58px;
  margin-left: 50px;
`;

const LoremIpsum2 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 24px;
  margin-left: 50px;
`;

const LoremIpsum3 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 25px;
  margin-top: 26px;
  margin-left: 435px;
`;

const LoremIpsum4 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 40px;
  margin-top: 15px;
  margin-left: 291px;
`;

const Image5 = styled.img`
  width: 100%;
  height: 170px;
  margin-top: 1px;
  object-fit: contain;
`;

const Image6 = styled.img`
  width: 100%;
  height: 170px;
  margin-left: 269px;
  object-fit: contain;
`;

const Image7 = styled.img`
  width: 100%;
  height: 170px;
  margin-left: 271px;
  object-fit: contain;
`;

const Image5Row = styled.div`
  height: 171px;
  flex-direction: row;
  display: flex;
  margin-top: 66px;
  margin-left: 159px;
  margin-right: 157px;
`;

const Rect2 = styled.div`
  width: 385px;
  height: 321px;
  background-color: #E6E6E6;
  flex-direction: column;
  display: flex;
`;

const LoremIpsum10 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 32px;
  margin-left: 30px;
`;

const LoremIpsum11 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 5px;
  margin-left: 30px;
`;

const Rect3 = styled.div`
  width: 385px;
  height: 321px;
  background-color: #E6E6E6;
  flex-direction: column;
  display: flex;
  margin-left: 54px;
`;

const LoremIpsum5 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 32px;
  margin-left: 30px;
`;

const LoremIpsum6 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 5px;
  margin-left: 30px;
`;

const Rect4 = styled.div`
  width: 385px;
  height: 321px;
  background-color: #E6E6E6;
  flex-direction: column;
  display: flex;
  margin-left: 56px;
`;

const LoremIpsum7 = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
  margin-top: 32px;
  margin-left: 36px;
`;

const LoremIpsum8 = styled.span`
  font-family: Roboto;
  top: 13px;
  left: 1px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
`;

const LoremIpsum9 = styled.span`
  font-family: Archivo;
  top: -1px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 20px;
`;

const LoremIpsum8Stack = styled.div`
  width: 323px;
  height: 110px;
  margin-top: 6px;
  margin-left: 36px;
  position: relative;
`;

const Rect2Row = styled.div`
  height: 321px;
  flex-direction: row;
  display: flex;
  margin-top: 35px;
  margin-left: 52px;
  margin-right: 49px;
`;

const Rect5 = styled.div`
  height: 80px;
  background-color: rgba(0,0,0,1);
  flex-direction: column;
  display: flex;
  margin-top: 36px;
`;

const LoremIpsum13 = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  margin-top: 32px;
  margin-left: 505px;
`;


export default HomeScreen;