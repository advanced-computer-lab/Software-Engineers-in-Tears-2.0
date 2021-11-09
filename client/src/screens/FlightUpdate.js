import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
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
      updateModal: false,
      updated:false
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

  preSubmit = (e) => {
    const list = document.getElementById('updateflight').children;
    console.log("before loop");
    for (let child of list) {
      console.log("in loop");
      if (isNullorWhiteSpace(this.state[child.name]) && child.required === true) {
        this.setState({ updateModal: true });
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
      .then(result=> {
        this.setState(data);
        this.setState({Flight_Date : this.displayDate()});
        this.orig = this.state; 
        this.setState({updated: true}); 
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <Modal style={{ width: '40%', position: 'fixed', top: '35%', left: '30%', backgroundColor: '#000000', borderRadius: 20, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', zIndex: 1000 }} show={this.state.updateModal}>
          <Modal.Header>
            <Modal.Title style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo Black', textAlign: 'center', marginTop: 40 }}>Are you sure you want to update this flight?</Modal.Title>
            <Modal.Dialog style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo', textAlign: 'center', marginTop: 40 }}>Updating when the required fields are empty will keep their previous value</Modal.Dialog>
          </Modal.Header>
          <Modal.Footer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 120 }}>
            <Button2
              onClick={() => this.setState({ updateModal: false })}
              title={'Cancel'}
              style={{
                width: 150,
                height: 50
              }}
            />
            <Button1
              onClick={(e) => {
                this.setState({ updateModal: false })
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
        <Container style={{ opacity: this.state.updateModal === true ? 0.5 : 1, pointerEvents: this.state.updateModal === true ? 'none' : 'initial' }}>
        <ProfileHeader title={'Admin'}/>
          <div style={{height: 80, backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <text style={{fontFamily: 'Archivo Black', color: '#f4f4f4', fontSize: 30, marginLeft: 50}}>Update Flight</text>
          <Button1 
            title={'Restore Original Values'}
            style={{width: 230, position: 'absolute', right: 50, height: 40}}
            onClick={() => {this.setState(this.orig); this.setState({updated:false})}}
          /> 
            {/* {this.state.updated?
            <span
            style={{color:"#F0A500", fontSize:"22px", fontFamily:"Archivo Black", zIndex:100, position:"absolute", top:139, left:"40%"}}
            >Flight Updated Successfully</span>
            :null}
            <Button1
              title="Restore Original Values"
              style={{ width: 250, height: 69, position: "absolute", right: "2%", top: 115, color:"black" }}
              onClick={() => {this.setState(this.orig); this.setState({updated:false})}}
            /> */}
          </div>
          <form name="updateflight" id="updateflight" style={{display: 'flex', flexDirection: 'column', marginLeft: 50}} onSubmit={this.onSubmit}>
          <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Flight Number: <label style={{color: '#F0A500'}}>*</label></label>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              name="FlightNumber"
              value={this.state.FlightNumber}
              onChange={this.onChange}
            />
            <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Departure Time:</label>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              name="DepartureTime"
              value={this.state.DepartureTime}
              onChange={this.onChange}
            />
            <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Arrival Time:</label>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              name="ArrivalTime"
              value={this.state.ArrivalTime}
              onChange={this.onChange}
            />
            <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Flight Date: <label style={{color: '#F0A500'}}>*</label></label>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="date"
              name="Flight_Date"
              value={this.state.Flight_Date}
              onChange={this.onChange}
              required='true'
            />
            <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Airport Terminal:</label>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="text"
              name="AirportTerminal"
              value={this.state.AirportTerminal}
              onChange={this.onChange}
            />
            <label style={{marginTop: 20, fontFamily: 'Archivo Black'}}>Number of {this.state.Cabin} class seats: <label style={{color: '#F0A500'}}>*</label></label>
            <Input
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}
              type="number"
              name="Seats_Available_on_Flight"
              value={this.state.Seats_Available_on_Flight}
              onChange={this.onChange}
              required='true'
            />
            <Button1 title="Save" style={{ width: 200, height: 50, marginTop: 30}} onClick={this.preSubmit}></Button1>
            {this.state.updated?
              <span
              style={{fontFamily: 'Archivo', color: '#047305', marginTop: 30, fontSize: 20}}
              >Flight Updated Successfully!</span>
            :null}
          </form>
          <Footer />
        </Container>
      </>
    );

  }



}

const Container = styled.div`
  display: flex;
  background-color: rgba(244,244,244,1);
  flex-direction: column;
`;

const Input = styled.input`
  height: 39px;
  width: 300px;
  border-top: none;
  border-right: none;
  border-left: none;
  background: rgba(0,0,0,0.03);
  border-bottom: 2px solid #F0A500;
`;

export default FlightUpdateScreen;