import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button4 from "../components/Button4";
import Modal from 'react-bootstrap/Modal';
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import AdminHeader from "../components/AdminHeader";


function AdminFlights(props) {

  const history = useHistory();
  const [flights, setFlights] = useState([]);
  const [toDelete, setToDelete] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);

  function deleteflight(id) {
    axios.delete("http://localhost:8000/adminflights/delete/" + id)
      .then(() => {
        console.log('wtf')
        setFlights(flights.filter((flight) => {
          return flight._id !== id;
        }))
      })
      .catch(err => console.log('catching wtf'));
  }

  useEffect(() => {
    axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
      .then(res => {
        if(res.data.isLoggedIn && res.data.Type !== 'administrator'){
          history.push('/')
        }
        else if (!res.data.isLoggedIn){
          localStorage.clear()
          history.push('/')
        }
      })
      .catch(err => {
        console.log(err);
      })
    if (props.location.showAll) {
      axios
        .get('http://localhost:8000/adminflights')
        .then(res => {
          setFlights(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      axios
        .post('http://localhost:8000/adminsearchflights', props.location.flightData)
        .then(res => {
          setFlights(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [props.location.flightData, props.location.showAll]);

  return (
    <>
      <Modal style={{ width: '40%', position: 'fixed', top: '35%', left: '30%', backgroundColor: '#000000', borderRadius: 20, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', zIndex: 1000 }} show={deleteModal}>
        <Modal.Header>
          <Modal.Title style={{ color: 'rgba(244,244,244,1)', fontFamily: 'Archivo Black', textAlign: 'center', marginTop: 40 }}>Are you sure you want to delete this flight?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 120 }}>
          <Button2
            onClick={() => setDeleteModal(false)}
            title={'Cancel'}
            style={{
              width: 150,
              height: 50
            }}
          />
          <Button1
            title={'Delete'}
            style={{
              width: 150,
              height: 50,
              marginLeft: 20
            }}
            onClick={() => { deleteflight(toDelete); setDeleteModal(false); }}
          />
        </Modal.Footer>
      </Modal>
      <Container style={{opacity: deleteModal === true ? 0.5 : 1, pointerEvents: deleteModal === true ? 'none' : 'initial'}}>
      <AdminHeader />
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Flight Date</th>
              <th>Cabin</th>
              <th>Seats Available</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr style={{ height: 50 }}>
                <td style={{ textAlign: 'center' }}>{flight.From}</td>
                <td style={{ textAlign: 'center' }}>{flight.To}</td>
                <td style={{ textAlign: 'center' }}>{flight.Flight_Date!=null?flight.Flight_Date.substring(0,10):null}</td>
                <td style={{ textAlign: 'center' }}>{flight.Cabin}</td>
                <td style={{ textAlign: 'center' }}>{flight.Seats_Available_on_Flight}</td>
                <td style={{ display: 'flex', marginLeft: 70, marginTop: 8 }}><Button1 title={'View Flight'} style={{ width: 160, height: 35 }} /></td>
                <td><Button1 title={'Update'} style={{ width: 120, height: 35 }} onClick={() => history.push(`/admin/update/${flight._id}`)} /></td>
                <td><Button4 title={'Delete'} style={{ width: 120, height: 35 }} onClick={() => { setDeleteModal(true); setToDelete(flight._id) }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AdminFlights;
