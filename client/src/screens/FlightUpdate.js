import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';
import ProfileCard from "../components/ProfileCard";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Modal from 'react-bootstrap/Modal';

function isNullorWhiteSpace(string) {
  console.log(typeof string, ":", string);
  if (string == null) {
    return true;
  }
  if (typeof (string) != "string") {
    console.log("returning false");
    return false;
  };

  const x = string.trim();
  return x.length === 0;
}

class FlightUpdateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlightNumber: '',
      AirportTerminal: '',
      DepartureTime: '',
      ArrivalTime: '',
      From: '',
      To: '',
      Flight_Date: null,
      Cabin: '',
      Seats_Available_on_Flight: null,
      deleteModal: false
    };
    this.orig = {};
  };

  componentDidMount() {
    axios.get('http://localhost:8000/adminUpdateFlight/' + this.props.match.params.id)
      .then(result => {
        this.setState({
          FlightNumber: result.data.FlightNumber,
          AirportTerminal: result.data.AirportTerminal,
          DepartureTime: result.data.DepartureTime,
          ArrivalTime: result.data.ArrivalTime,
          From: result.data.From,
          To: result.data.To,
          Flight_Date: result.data.Flight_Date,
          Cabin: result.data.Cabin,
          Seats_Available_on_Flight: result.data.Seats_Available_on_Flight
        });
        this.setState({ Flight_Date: this.displayDate() });
        this.orig = this.state;
        console.log(this.state.Flight_Date);
      })
      .catch(err => console.error(err));
  };

  onChange = e => {
    // console.log(e.target.value); 
    var value = e.target.value
    // if(value ===''&&(e.target.name==="Flight_Date"||e.target.name==="Seats_Available_on_Flight")){
    //   value = this.orig[e.target.name];
    //   console.log('in if');
    // } 
    this.setState({ [e.target.name]: value }, () => console.log(this.state.Flight_Date));
    // console.log(this.state.Flight_Date);
  }

  onHover = (e) => {
    e.target.style.background = "rgba(0,0,0,0.06)"
  }

  onHoverLeave = e => {
    e.target.style.background = "rgba(0,0,0,0.03)"
  }

  displayDate = () => {
    const d = new Date(this.state.Flight_Date);
    const year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = d.getDate();
    day = day < 10 ? "0" + day : day;
    return year + "-" + month + "-" + day;
  }

  preSubmit = (e) =>{
    const list = document.getElementById('updateflight').children;
    console.log("before loop");
    for (let child of list) {
      console.log("in loop");
      if (isNullorWhiteSpace(this.state[child.name])&&child.required == true) {
        this.setState({ deleteModal: true });
        return;
      }
    };
    this.onSubmit(e);
    
  }

  onSubmit = e => {
    e.preventDefault();

    const data = {
      FlightNumber: isNullorWhiteSpace(this.state.FlightNumber) ? null : this.state.FlightNumber,
      AirportTerminal: isNullorWhiteSpace(this.state.AirportTerminal) ? null : this.state.AirportTerminal,
      DepartureTime: isNullorWhiteSpace(this.state.DepartureTime) ? null : this.state.DepartureTime,
      ArrivalTime: isNullorWhiteSpace(this.state.ArrivalTime) ? null : this.state.ArrivalTime,
      From: isNullorWhiteSpace(this.state.From) ? null : this.state.From,
      To: isNullorWhiteSpace(this.state.To) ? null : this.state.To,
      Flight_Date: isNullorWhiteSpace(this.state.Flight_Date) ? new Date(this.orig.Flight_Date) : new Date(this.state.Flight_Date),
      Cabin: isNullorWhiteSpace(this.state.Cabin) ? null : this.state.Cabin,
      Seats_Available_on_Flight: isNullorWhiteSpace(this.state.Seats_Available_on_Flight) ? this.orig.Seats_Available_on_Flight : this.state.Seats_Available_on_Flight
    };

    axios.put('http://localhost:8000/adminUpdateFlight/' + this.props.match.params.id, data)
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <Modal style={{ width: '40%', position: 'fixed', top: '35%', left: '30%', backgroundColor: '#000000', borderRadius: 20, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', zIndex: 1000 }} show={this.state.deleteModal}>
          <Modal.Header>
            <Modal.Title style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo Black', textAlign: 'center', marginTop: 40 }}>Are you sure you want to update this flight?</Modal.Title>
            <Modal.Dialog style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo', textAlign: 'center', marginTop: 40 }}>Updating when the required fields are empty will keep their previous value</Modal.Dialog>
          </Modal.Header>
          <Modal.Footer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 120 }}>
            <Button2
              onClick={() => this.setState({ deleteModal: false })}
              title={'Cancel'}
              style={{
                width: 150,
                height: 50
              }}
            />
            <Button1
              onClick={(e)=>{
                this.setState({deleteModal:false})
                this.onSubmit(e)
              }}
              title={'Update'}
              style={{
                width: 150,
                height: 50,
                marginLeft: 20
              }}
            />
          </Modal.Footer>
        </Modal>
        <Container style={{ opacity: this.state.deleteModal === true ? 0.5 : 1, pointerEvents: this.state.deleteModal === true ? 'none' : 'initial' }}>
          <Rect>
            <Image4Row>
              <Image4 src={require("../assets/images/logo3.png").default}></Image4>
              <DuneAirlines>DUNE</DuneAirlines>
            </Image4Row>
            <ProfileCard
              title={'Admin'}
            />
          </Rect>
          <Rect2>
            <UpdateFlight>UPDATE FLIGHT</UpdateFlight>
          </Rect2>
          <form name="updateflight" id="updateflight" style={{ marginTop: 30 }} onSubmit={this.onSubmit}>
            <Field>Flight Number</Field>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              placeholder={this.orig.FlightNumber}
              name="FlightNumber"
              value={this.state.FlightNumber}
              onChange={this.onChange}
            />
            <Field>Departure Time</Field>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              placeholder={this.orig.DepartureTime}
              name="DepartureTime"
              value={this.state.DepartureTime}
              onChange={this.onChange}
            />
            <Field>Arrival Time</Field>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              placeholder={this.orig.ArrivalTime}
              name="ArrivalTime"
              value={this.state.ArrivalTime}
              onChange={this.onChange}
            />
            <Field>Flight Date<Field style={{ color: "#CF7500", marginLeft: "0px" }}> *</Field></Field>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              // onEmptied={(e)=>{
              //   console.log('in emptied');
              //   e.target.value = this.state.Date;
              // }}
              type="date"
              name="Flight_Date"
              value={this.state.Flight_Date}
              onChange={this.onChange}
              required='true'
            />
            <Field>Airport Terminal</Field>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              placeholder={this.orig.AirportTerminal}
              name="AirportTerminal"
              value={this.state.AirportTerminal}
              onChange={this.onChange}
            />
            <Field>Number of {this.state.Cabin} Class seats<Field style={{ color: "#CF7500", marginLeft: "0px" }}> *</Field></Field>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="number"
              placeholder={this.orig.Seats_Available_on_Flight}
              name="Seats_Available_on_Flight"
              value={this.state.Seats_Available_on_Flight}
              onChange={this.onChange}
              required='true'
            />
            <Button1 title="Save" style={{ width: 300, height: 69, fontSize: 40, color: "#F4F4F4", marginLeft: 50 }} onClick={this.preSubmit}></Button1>
          </form>
        </Container>
      </>
    );

  }



}

const Container = styled.div`
  display: flex;
  background-color: rgba(244,244,244,1);
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Input = styled.input`
  height: 29px;
  width: 300px;
  border-top: none;
  border-right: none;
  border-left: none;
  background: rgba(0,0,0,0.03);
  border-bottom: 2px solid #F0A500;
  border-radius: 4px;
  flex-direction: row;
  display: flex;
  font-size: 19px;
  margin-left: 50px;
  margin-right: 81px;
  margin-bottom: 10px;
`;

const Rect2 = styled.div`
  height: 100px;
  background-color: rgba(0,0,0,1);
  flex-direction: row;
  display: flex;
  border-top: 1px solid gray;
`;

const UpdateFlight = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 39px;
  margin-top: 25px;
  margin-left: 50px;
`;

const Field = styled.span`
  font-family: Archivo Black;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  font-size: 22px;
  margin-top: 0px;
  margin-left: 50px;
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

const Image4Row = styled.div`
  height: 49px;
  flex-direction: row;
  display: flex;
  margin-right: 100px;
  margin-left: 50px;
  margin-top: 37px;
`;

const DuneAirlines = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  color: rgba(244,244,244,1);
  font-size: 30px;
  margin-left: 10px;
`;

export default FlightUpdateScreen;