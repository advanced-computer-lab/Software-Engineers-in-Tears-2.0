import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import ButtonIcon from "../components/ButtonIcon";
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
var timeoutHandle;
class UserUpdateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      First_Name: '',
      Last_Name: '',
      Email: '',
      Passport_Number: '',
      updateModal: false,
      update: false,
      loading: true,
      emailLoading: false,
      validEmail: true
    };
    this.orig = {};
    this.userID = localStorage.getItem('userID');
  };
  componentDidMount() {
    axios.post('http://localhost:8000/getUserByID/', { _id: this.userID })
      .then(result => {
        console.log(result);
        this.setState({
          First_Name: result.data[0].First_Name,
          Last_Name: result.data[0].Last_Name,
          Email: result.data[0].Email,
          Passport_Number: result.data[0].Passport_Number
        });
        this.setState({ loading: false });
        this.orig = this.state;
      })
      .catch(err => console.error(err));

    console.log(this.state.First_Name)
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
    if (e.target.name === 'Email') {
      this.setState({ emailLoading: true });
      if (timeoutHandle) {
        window.clearTimeout(timeoutHandle);
      }
      timeoutHandle = window.setTimeout(() => {
        axios.post('http://localhost:8000/getUserByID/', { Email: value })
          .then((result) => {
            console.log(result.data);
            if (result.data.length === 0 || value === this.orig.Email) {
              this.setState({ emailLoading: false, validEmail: true });
            }
            else {
              this.setState({ emailLoading: false, validEmail: false });
            }
          })
          .catch(err => console.log(err));
      }, 750);

    }
  }

  onHover = (e) => {
    e.target.style.background = "rgba(0,0,0,0.06)"
  }

  onHoverLeave = e => {
    e.target.style.background = "rgba(0,0,0,0.03)"
  }

  preSubmit = (e) => {
    const list = document.getElementById('d').children;
    for (let child of list) {
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
      First_Name: isNullorWhiteSpace(this.state.First_Name) ? this.orig.First_Name : this.state.First_Name,
      Last_Name: isNullorWhiteSpace(this.state.Last_Name) ? this.orig.Last_Name : this.state.Last_Name,
      Email: isNullorWhiteSpace(this.state.Email) ? this.orig.Email : this.state.Email,
      Passport_Number: isNullorWhiteSpace(this.state.Passport_Number) ? this.orig.Passport_Number : this.state.Passport_Number
    };

    axios.put('http://localhost:8000/updateUser/' + this.userID, data)
      .then(result => {
        this.setState(data);
        this.orig = this.state;
        this.setState({ update: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <Modal style={{ width: '40%', position: 'fixed', top: '35%', left: '30%', backgroundColor: '#000000', borderRadius: 20, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', zIndex: 1000 }} show={this.state.updateModal}>
          <Modal.Header>
            <Modal.Title style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo Black', textAlign: 'center', marginTop: 40 }}>Are you sure you want to update your info?</Modal.Title>
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
        <Container style={{ display: 'flex', flexDirection: 'row', opacity: this.state.updateModal === true ? 0.5 : 1, pointerEvents: this.state.updateModal === true ? 'none' : 'initial' }}>
          <div style={{ minWidth: 200, backgroundColor: '#000', display: 'flex', flexDirection: 'column', height: window.innerHeight, marginBottom: -35, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 200, backgroundColor: '#000', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 30 }}>
              <Image2
                src={require("../assets/images/profile-icon.png").default}
              />
              <label style={{ color: '#F0A500', fontFamily: 'Archivo Black', fontSize: 20 }}>{this.state.First_Name}</label>
            </div>
            <Button1 style={{ width: 170, height: 40, fontSize: 15, position: 'absolute', top: 100 }} title={'Back To Home Page'} onClick={() => this.props.history.push('/')} />
            <ButtonIcon path={'home'} style={{ width: '100%', height: 70, fontSize: 15 }} title={'Home'} onClick={() => this.props.history.push('/profile/home')} />
            <ButtonIcon path={"profile2"} style={{ width: '100%', height: 70, fontSize: 15 }} title={'My Profile'} selected={true} />
            <ButtonIcon path={"wallet"} style={{ width: '100%', height: 70, fontSize: 15 }} title={'Wallet'} />
            <ButtonIcon path={"bookings"} style={{ width: '100%', height: 70, fontSize: 15 }} title={'Bookings'} onClick={() => this.props.history.push('/profile/bookings')} />
            <Button1 style={{ width: 100, height: 40, fontSize: 15, position: 'absolute', bottom: 30 }} title={'Logout'} onClick={() => { localStorage.clear(); this.props.history.push('/') }} />
          </div>
          {/* <Button1
              title={'Restore Original Values'}
              style={{ width: 230, position: 'absolute', right: 50, height: 40 }}
              onClick={() => { this.setState(this.orig); }
            /> */}
          {this.state.loading ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: window.innerHeight, backgroundColor: 'rgb(244, 244, 244)' }}>
              <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
            </div> : (this.state.update ?
              <form name="updateuser" id="updateuser" style={{ display: 'flex', flexDirection: 'column', marginTop: 20, marginLeft: 40, width: '100%', height: window.innerHeight }}>
                <div id='d' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>First Name: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="First_Name"
                    value={this.state.First_Name}
                    onChange={this.onChange}
                    required='true'
                  />
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Last Name: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="Last_Name"
                    value={this.state.Last_Name}
                    onChange={this.onChange}
                    required='true'
                  />
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Email: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="Email"
                    value={this.state.Email}
                    onChange={this.onChange}
                    required='true'
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: 300, height: 20, marginTop: -37, marginBottom: 17, backgroundColor: 'rgb(244, 244, 244)' }}>
                    {this.state.emailLoading ?
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                        <ReactLoading type={"spin"} color={"#F0A500"} height={'100%'} width={'100%'} />
                      </div>
                      : (
                        this.state.validEmail ?
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                            <Image1
                              src={require('../assets/images/Check.png').default}
                            />
                          </div>
                          :
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                            <Image1
                              src={require('../assets/images/X.png').default}
                            />
                          </div>

                      )
                    }
                    {
                      !this.state.emailLoading ?
                        this.state.validEmail ?
                          <label style={{ color: '#147315', fontStyle: "Archivo Regular" }}>This email is available</label>
                          :
                          <label style={{ color: '#731415', fontStyle: "Archivo Regular" }}>Invalid or unavailable email</label>
                        : null
                    }
                  </div>
                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Passport Number: <label style={{ color: '#F0A500' }}>*</label></label>
                  <Input
                    onMouseEnter={this.onHover}
                    onMouseLeave={this.onHoverLeave}
                    type="text"
                    name="Passport_Number"
                    value={this.state.Passport_Number}
                    onChange={this.onChange}
                    required='true'
                  />

                  <div style={{ display: 'flex', flexDirection: 'row ', justifyContent: 'left', marginLeft: '0px' }}>
                    <Button1 title="Cancel" style={{ width: 145, height: 50, marginTop: 30, marginRight:10 }} onClick={()=>{this.setState(this.orig);this.setState({update:false});}}></Button1>
                    <Button1 title="Save" disabled={this.state.emailLoading||!this.state.validEmail} style={{ width: 145, height: 50, marginTop: 30 }} onClick={this.preSubmit}></Button1>
                  </div>
                </div>
              </form> :
              <form name="updateuser" id="updateuser" style={{ display: 'flex', flexDirection: 'column', marginTop: 20, marginLeft: 40, width: '100%', height: window.innerHeight }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>First Name: </label>
                  <label style={{ fontFamily: 'Archivo Regular', marginTop: 13, marginBottom: 51 }}>{this.state.First_Name}</label>

                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Last Name: </label>
                  <label style={{ fontFamily: 'Archivo Regular', marginTop: 13, marginBottom: 51 }}>{this.state.Last_Name}</label>

                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Email: </label>
                  <label style={{ fontFamily: 'Archivo Regular', marginTop: 13, marginBottom: 51 }}>{this.state.Email}</label>

                  <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Passport Number: </label>
                  <label style={{ fontFamily: 'Archivo Regular', marginTop: 13, marginBottom: 51 }}>{this.state.Passport_Number}</label>

                  <div style={{ display: 'flex', flexDirection: 'column ', justifyContent: 'center', alignItems: 'left', marginLeft: '50px' }}>
                    <Button1 title="Update Info" style={{ width: 200, height: 50, marginTop: 30 }} onClick={() => this.setState({ update: true })}></Button1>
                  </div>
                </div>
              </form>
            )
          }
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

const Image2 = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;
const Image1 = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export default UserUpdateScreen;