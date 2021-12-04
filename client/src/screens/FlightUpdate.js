import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Modal from 'react-bootstrap/Modal';
import ReactLoading from 'react-loading';

function isNullorWhiteSpace(string) {
  if (string == null) {
    return true;
  }
  if (typeof (string) != "string") {
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
      Flight_Date: null,
      Arrival_Date: null,
      Cabin: '',
      Seats_Available_on_Flight: null,
      Baggage_Allowance: null,
      Price: null,
      updateModal: false,
      updated: false,
      loading: true
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
          Flight_Date: result.data.Flight_Date,
          Arrival_Date: result.data.Arrival_Date,
          Cabin: result.data.Cabin,
          Seats_Available_on_Flight: result.data.Seats_Available_on_Flight,
          Baggage_Allowance: result.data.Baggage_Allowance,
          Price: result.data.Price
        });
        this.setState({ Flight_Date: this.displayDate(this.state.Flight_Date), Arrival_Date: this.displayDate(this.state.Arrival_Date) });
        this.setState({ loading: false });
        this.orig = this.state;
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
    this.setState({ [e.target.name]: value });
    // console.log(this.state.Flight_Date);
  }

  onHover = (e) => {
    e.target.style.background = "rgba(0,0,0,0.06)"
  }

  onHoverLeave = e => {
    e.target.style.background = "rgba(0,0,0,0.03)"
  }

  displayDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = d.getDate();
    day = day < 10 ? "0" + day : day;
    return year + "-" + month + "-" + day;
  }

  preSubmit = (e) => {
    var array1 = Array.prototype.slice.call(document.getElementById("d1").children, 0);
    var array2 = Array.prototype.slice.call(document.getElementById("d2").children, 0);
    var array3 = document.getElementsByName('Price')[0];
    const list = array1.concat(array2).concat(array3);
    console.log(list);
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
      FlightNumber: isNullorWhiteSpace(this.state.FlightNumber) ? this.orig.FlightNumber : this.state.FlightNumber,
      AirportTerminal: isNullorWhiteSpace(this.state.AirportTerminal) ? this.orig.AirportTerminal : this.state.AirportTerminal,
      DepartureTime: isNullorWhiteSpace(this.state.DepartureTime) ? this.orig.DepartureTime : this.state.DepartureTime,
      ArrivalTime: isNullorWhiteSpace(this.state.ArrivalTime) ? this.orig.ArrivalTime : this.state.ArrivalTime,
      Flight_Date: isNullorWhiteSpace(this.state.Flight_Date) ? new Date(this.orig.Flight_Date) : new Date(this.state.Flight_Date),
      Arrival_Date: isNullorWhiteSpace(this.state.Arrival_Date) ? new Date(this.orig.Arrival_Date) : new Date(this.state.Arrival_Date),
      Seats_Available_on_Flight: isNullorWhiteSpace(this.state.Seats_Available_on_Flight) ? this.orig.Seats_Available_on_Flight : this.state.Seats_Available_on_Flight,
      Baggage_Allowance: isNullorWhiteSpace(this.state.Baggage_Allowance) ? this.orig.Baggage_Allowance : this.state.Baggage_Allowance,
      Price: isNullorWhiteSpace(this.state.Price) ? this.orig.Price : this.state.Price
    };

    axios.put('http://localhost:8000/adminUpdateFlight/' + this.props.match.params.id, data)
      .then(result => {
        this.setState(data);
        this.setState({ Flight_Date: this.displayDate(this.state.Flight_Date), Arrival_Date:this.displayDate(this.state.Arrival_Date) });
        this.orig = this.state;
        this.setState({ updated: true });
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
        <Container style={{ minHeight: "100%", opacity: this.state.updateModal === true ? 0.5 : 1, pointerEvents: this.state.updateModal === true ? 'none' : 'initial' }}>
          <ProfileHeader title={'Admin'} path={'/admin'} />
          <div style={{ height: 80, backgroundColor: '#000', borderTop: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <text style={{ fontFamily: 'Archivo Black', color: '#f4f4f4', fontSize: 30, marginLeft: 50 }}>Update Flight</text>
            <Button1
              title={'Restore Original Values'}
              style={{ width: 230, position: 'absolute', right: 50, height: 40 }}
              onClick={() => { this.setState(this.orig); this.setState({ updated: false }) }}
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
          {this.state.loading ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: 'rgb(244, 244, 244)' }}>
              <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
            </div> :
            <form name="updateflight" id="updateflight" style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }} >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Div1 id="d1">
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Flight Number: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="FlightNumber"
                    value={this.state.FlightNumber}
                    onChange={this.onChange}
                    required='true'
                  />
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Departure Date: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="date"
                    name="Flight_Date"
                    value={this.state.Flight_Date}
                    onChange={this.onChange}
                    required='true'
                  />
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Departure Time: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="DepartureTime"
                    value={this.state.DepartureTime}
                    onChange={this.onChange}
                    required='true'
                  />
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Airport Terminal: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="AirportTerminal"
                    value={this.state.AirportTerminal}
                    onChange={this.onChange}
                    required='true'
                  />
                </Div1>
                <Div1 id="d2">
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Number of {this.state.Cabin} class seats: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="number"
                    name="Seats_Available_on_Flight"
                    value={this.state.Seats_Available_on_Flight}
                    onChange={this.onChange}
                    required='true'
                  />
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Arrival Date: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="date"
                    name="Arrival_Date"
                    value={this.state.Arrival_Date}
                    onChange={this.onChange}
                    required='true'
                  />
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Arrival Time: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="ArrivalTime"
                    value={this.state.ArrivalTime}
                    onChange={this.onChange}
                    required='true'
                  />

                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Baggage Allowance(kg): <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="number"
                    name="Baggage_Allowance"
                    value={this.state.Baggage_Allowance}
                    onChange={this.onChange}
                    required='true'
                  />

                </Div1>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column ', justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>
                <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Price($): <label style={{ color: '#F0A500' }}>*</label></label>
                <Input
                  onMouseEnter={this.onHover}
                  onMouseLeave={this.onHoverLeave}
                  type="number"
                  name="Price"
                  value={this.state.Price}
                  onChange={this.onChange}
                  required='true'
                />
                {this.state.updated ?
                  <span
                    style={{ fontFamily: 'Archivo', color: '#047305', marginTop: -20, marginBottom:0, fontSize: 20 }}
                  >Flight Updated Successfully!</span>
                  : null}
                <Button1 title="Save" style={{ width: 200, height: 50, marginTop: 30 }} onClick={this.preSubmit}></Button1>
              </div>
            </form>
          }
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
  margin-bottom: 40px;
  background: rgba(0,0,0,0.03);
  border-bottom: 2px solid #F0A500;
  font-size: 15px;
`;

const Div1 = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default FlightUpdateScreen;