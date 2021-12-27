import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
      validEmail: true, 
      hover1: 'black',
      hover2: '#F0A500',
      hover3: 'black',
      hover4: 'black',
      hover5: 'black',
      firstName: localStorage.getItem('firstName')
    };
    this.orig = {};
    this.userID = localStorage.getItem('userID');
  };
  componentDidMount() {
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(!res.data.isLoggedIn){
          localStorage.clear()
          this.props.history.push('/')
        }
        else if(res.data.Type === 'administrator'){
          this.props.history.push('/admin')
        }
      })
      .catch(err => {
        console.log(err);
      })
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
        localStorage.setItem('firstName', data.First_Name);
        localStorage.setItem('userEmail', data.Email);
        this.setState({firstName: data.First_Name});
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
        <Container style={{ display: 'flex', flexDirection: 'column', opacity: this.state.updateModal === true ? 0.5 : 1, pointerEvents: this.state.updateModal === true ? 'none' : 'initial' }}>
          <Header title={this.state.firstName} selected={'Name'}/>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: 200}}>
                <label onMouseEnter={() => this.setState({hover1: '#CF7500'})} onMouseLeave={() => this.setState({hover1: 'black'})} style={{color: this.state.hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15}} onClick={() => this.props.history.push('/profile/home')}>Home</label>
                <label onMouseEnter={() => this.setState({hover2: '#CF7500'})}onMouseLeave={() => this.setState({hover2: '#F0A500'})} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: this.state.hover2}} onClick={() => this.props.history.push('/profile/account')}>My Account</label>
                <label onMouseEnter={() => this.setState({hover3: '#CF7500'})} onMouseLeave={() => this.setState({hover3: 'black'})} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: this.state.hover3}} onClick={() => this.props.history.push('/profile/bookings')}>My Bookings</label>
                <label onMouseEnter={() => this.setState({hover4: '#CF7500'})} onMouseLeave={() => this.setState({hover4: 'black'})} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: this.state.hover4}} onClick={() => this.props.history.push('/profile/changepassword')}>Change Password</label>
                <label onMouseEnter={() => this.setState({hover5: '#CF7500'})} onMouseLeave={() => this.setState({hover5: 'black'})} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: this.state.hover5}} onClick={() => {this.props.history.push('/'); localStorage.clear()}}>Log Out</label>
              </div>
          {this.state.loading ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: window.innerWidth-200, height: window.innerHeight, marginLeft: 50, marginRight: 180 }}>
              <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
            </div> 
            : (this.state.update ?
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
                <Image4 style={{marginRight: 180, height: 250, marginTop: 20, display: 'flex', flexDirection: 'column', boxShadow: '0px 1px 5px  0.35px #000',}}>
                  <div style={{width: '100%', height: 170, display: 'flex', flexDirection: 'row', marginTop: 'auto', backgroundColor: '#fff', boxShadow: '0px 0.5px 0.5px  0px #000'}}>
                    <div style={{width: '49.5%', display: 'flex', flexDirection: 'column'}}>
                      <Image2 style={{width: 90, height: 90, marginLeft: 40, marginTop: -45, border: '6px solid white', borderRadius: 50}} src={require("../assets/images/profile.webp").default}/>
                      <label style={{marginLeft: 46, marginTop: 10, fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Mr. {this.state.First_Name} {this.state.Last_Name}</label>
                      <label style={{marginLeft: 46, marginTop: 'auto', marginBottom: 20, fontFamily: 'Archivo', fontSize: 15}}>EK 675 975 720</label>
                    </div>
                    <div style={{height: '85%', backgroundColor: 'grey', width: 2, alignSelf: 'center'}}/>
                    <div style={{width: '49.5%', display: 'flex', flexDirection: 'column'}}>
                      <label style={{marginLeft: 40, marginTop: 20, fontFamily: 'Archivo', fontSize: 20}}>Skyward Miles</label>
                      <label style={{marginLeft: 40, marginTop: 10, fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>0</label>
                    </div>
                  </div>
                </Image4>
                <label style={{textAlign: 'center', marginRight: 180, marginTop: 40, fontSize: 30, fontFamily: 'Archivo', fontWeight: 'bold'}}>Personal Details</label>
                <label style={{textAlign: 'center', marginRight: 180, marginTop: 15, fontSize: 20, fontFamily: 'Archivo'}}>Update your information regularly so you don’t miss out on news, <br />offers and services</label>
                <div id='d' style={{marginRight: 180, boxShadow: '0px 1px 5px  0.35px #000', display: 'flex', flexDirection: 'column', marginTop: 30}}>
                    <div style={{width: '100%', marginTop: 40, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <label style={{fontFamily: 'Archivo', marginLeft: 46, fontSize: 25}}>Contact Details</label>
                    </div>
                    <div style={{marginLeft: 46, marginTop: 20, width: 70, height: 3, backgroundColor: '#F0A500'}}/>
                    <div style={{width: '50%', marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 46}}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>First Name</label>
                        <Input
                          onMouseEnter={this.onHover}
                          onMouseLeave={this.onHoverLeave}
                          type="text"
                          name="First_Name"
                          value={this.state.First_Name}
                          onChange={this.onChange}
                          required='true'
                        />
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', marginLeft: 310}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Last Name</label>
                        <Input
                          onMouseEnter={this.onHover}
                          onMouseLeave={this.onHoverLeave}
                          type="text"
                          name="Last_Name"
                          value={this.state.Last_Name}
                          onChange={this.onChange}
                          required='true'
                        />
                      </div>
                    </div>
                    <div style={{width: '50%', marginTop: 30, display: 'flex', flexDirection: 'row', marginLeft: 46}}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Email</label>
                        <Input
                          onMouseEnter={this.onHover}
                          onMouseLeave={this.onHoverLeave}
                          type="text"
                          name="Email"
                          value={this.state.Email}
                          onChange={this.onChange}
                          required='true'
                        />
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                          {this.state.emailLoading ?
                              <ReactLoading type={"spin"} color={"#F0A500"} height={20} width={20} />
                            : (this.state.validEmail ?
                                <Image1 src={require('../assets/images/Check.png').default}/>
                              :
                                <Image1 src={require('../assets/images/X.png').default} />
                              )
                          }
                          {!this.state.emailLoading ?
                              this.state.validEmail ?
                                <label style={{ color: '#147315', fontStyle: "Archivo", marginLeft: 5}}>This email is available</label>
                              :
                                <label style={{ color: '#731415', fontStyle: "Archivo", marginLeft: 5}}>Invalid or unavailable email</label>
                            : null
                          }
                        </div>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', marginLeft: 310}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Passport Number</label>
                        <Input
                          onMouseEnter={this.onHover}
                          onMouseLeave={this.onHoverLeave}
                          type="text"
                          name="Passport_Number"
                          value={this.state.Passport_Number}
                          onChange={this.onChange}
                          required='true'
                        />
                      </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 46, marginTop: 40, marginBottom: 40}}>
                      <Button1 title="Cancel" style={{width: 150, height: 40}} onClick={()=>{this.setState(this.orig);this.setState({update:false});}}></Button1>
                      <Button1 title="Save" disabled={this.state.emailLoading||!this.state.validEmail} style={{width: 150, height: 40, marginLeft: 20}} onClick={this.preSubmit}></Button1>
                    </div>
                </div>
              </div>
              // <form name="updateuser" id="updateuser" style={{ display: 'flex', flexDirection: 'column', marginTop: 20, marginLeft: 50, width: window.innerWidth-200, height: window.innerHeight}}>
              //   <div id='d' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              //     <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>First Name: <label style={{ color: '#F0A500' }}>*</label></label>
              //     <Input
              //       onMouseEnter={this.onHover}
              //       onMouseLeave={this.onHoverLeave}
              //       type="text"
              //       name="First_Name"
              //       value={this.state.First_Name}
              //       onChange={this.onChange}
              //       required='true'
              //     />
              //     <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Last Name: <label style={{ color: '#F0A500' }}>*</label></label>
              //     <Input
              //       onMouseEnter={this.onHover}
              //       onMouseLeave={this.onHoverLeave}
              //       type="text"
              //       name="Last_Name"
              //       value={this.state.Last_Name}
              //       onChange={this.onChange}
              //       required='true'
              //     />
              //     <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Email: <label style={{ color: '#F0A500' }}>*</label></label>
              //     <Input
              //       onMouseEnter={this.onHover}
              //       onMouseLeave={this.onHoverLeave}
              //       type="text"
              //       name="Email"
              //       value={this.state.Email}
              //       onChange={this.onChange}
              //       required='true'
              //     />
              //     <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: 300, height: 20, marginTop: -37, marginBottom: 17, backgroundColor: 'rgb(244, 244, 244)' }}>
              //       {this.state.emailLoading ?
              //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
              //           <ReactLoading type={"spin"} color={"#F0A500"} height={'100%'} width={'100%'} />
              //         </div>
              //         : (
              //           this.state.validEmail ?
              //             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
              //               <Image1
              //                 src={require('../assets/images/Check.png').default}
              //               />
              //             </div>
              //             :
              //             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
              //               <Image1
              //                 src={require('../assets/images/X.png').default}
              //               />
              //             </div>

              //         )
              //       }
              //       {
              //         !this.state.emailLoading ?
              //           this.state.validEmail ?
              //             <label style={{ color: '#147315', fontStyle: "Archivo Regular" }}>This email is available</label>
              //             :
              //             <label style={{ color: '#731415', fontStyle: "Archivo Regular" }}>Invalid or unavailable email</label>
              //           : null
              //       }
              //     </div>
              //     <label style={{ marginTop: 20, fontFamily: 'Archivo Black' }}>Passport Number: <label style={{ color: '#F0A500' }}>*</label></label>
              //     <Input
              //       onMouseEnter={this.onHover}
              //       onMouseLeave={this.onHoverLeave}
              //       type="text"
              //       name="Passport_Number"
              //       value={this.state.Passport_Number}
              //       onChange={this.onChange}
              //       required='true'
              //     />

              //     <div style={{ display: 'flex', flexDirection: 'row ', justifyContent: 'left', marginLeft: '0px' }}>
              //       <Button1 title="Cancel" style={{ width: 145, height: 50, marginTop: 30, marginRight:10 }} onClick={()=>{this.setState(this.orig);this.setState({update:false});}}></Button1>
              //       <Button1 title="Save" disabled={this.state.emailLoading||!this.state.validEmail} style={{ width: 145, height: 50, marginTop: 30 }} onClick={this.preSubmit}></Button1>
              //     </div>
              //   </div>
              // </form> 
              :
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
                <Image4 style={{marginRight: 180, height: 250, marginTop: 20, display: 'flex', flexDirection: 'column', boxShadow: '0px 1px 5px  0.35px #000',}}>
                  <div style={{width: '100%', height: 170, display: 'flex', flexDirection: 'row', marginTop: 'auto', backgroundColor: '#fff', boxShadow: '0px 0.5px 0.5px  0px #000'}}>
                    <div style={{width: '49.5%', display: 'flex', flexDirection: 'column'}}>
                      <Image2 style={{width: 90, height: 90, marginLeft: 40, marginTop: -45, border: '6px solid white', borderRadius: 50}} src={require("../assets/images/profile.webp").default}/>
                      <label style={{marginLeft: 46, marginTop: 10, fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Mr. {this.state.First_Name} {this.state.Last_Name}</label>
                      <label style={{marginLeft: 46, marginTop: 'auto', marginBottom: 20, fontFamily: 'Archivo', fontSize: 15}}>EK 675 975 720</label>
                    </div>
                    <div style={{height: '85%', backgroundColor: 'grey', width: 2, alignSelf: 'center'}}/>
                    <div style={{width: '49.5%', display: 'flex', flexDirection: 'column'}}>
                      <label style={{marginLeft: 40, marginTop: 20, fontFamily: 'Archivo', fontSize: 20}}>Skyward Miles</label>
                      <label style={{marginLeft: 40, marginTop: 10, fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>0</label>
                    </div>
                  </div>
                </Image4>
                <label style={{textAlign: 'center', marginRight: 180, marginTop: 40, fontSize: 30, fontFamily: 'Archivo', fontWeight: 'bold'}}>Personal Details</label>
                <label style={{textAlign: 'center', marginRight: 180, marginTop: 15, fontSize: 20, fontFamily: 'Archivo'}}>Update your information regularly so you don’t miss out on news, <br />offers and services</label>
                <div style={{marginRight: 180, boxShadow: '0px 1px 5px  0.35px #000', height: 300, display: 'flex', flexDirection: 'column', marginTop: 30}}>
                    <div style={{width: '100%', marginTop: 40, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <label style={{fontFamily: 'Archivo', marginLeft: 46, fontSize: 25}}>Contact Details</label>
                      <Button1 title="Update Details" style={{width: 150, height: 40, marginLeft: 'auto', marginRight: 46}} onClick={() => this.setState({update: true})}></Button1>
                    </div>
                    <div style={{marginLeft: 46, marginTop: 20, width: 70, height: 3, backgroundColor: '#F0A500'}}/>
                    <div style={{width: '50%', marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 46}}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>First Name</label>
                        <label style={{fontFamily: 'Archivo', marginTop: 10}}>{this.state.First_Name}</label>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', marginLeft: 310}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Last Name</label>
                        <label style={{fontFamily: 'Archivo', marginTop: 10}}>{this.state.Last_Name}</label>
                      </div>
                    </div>
                    <div style={{width: '50%', marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 46}}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Email</label>
                        <label style={{fontFamily: 'Archivo', marginTop: 10}}>{this.state.Email}</label>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', marginLeft: 310}}>
                        <label style={{fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Passport Number</label>
                        <label style={{fontFamily: 'Archivo', marginTop: 10}}>{this.state.Passport_Number}</label>
                      </div>
                    </div>
                </div>
              </div>
            )
          }
          </div>
          <Footer />
        </Container>
      </>
    );

  }



}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 39px;
  width: 200px;
  border-top: none;
  border-right: none;
  border-left: none;
  margin-top: 5px;
  background: rgba(0,0,0,0.03);
  border-bottom: 2px solid #F0A500;
  font-size: 15px;
`;

const Image1 = styled.img`
  width: 15px;
  height: 15px;
`;

const Image4 = styled.div`
  background-image: url(${require("../assets/images/background.webp").default});
  background-size: cover;
`;

const Image2 = styled.img`
`;

export default UserUpdateScreen;