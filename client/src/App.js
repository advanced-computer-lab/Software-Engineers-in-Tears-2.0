import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import CreateFlight from './screens/CreateFlight.js';
import AdminHome from './screens/AdminHome';
import FlightUpdate from './screens/FlightUpdate';
import AdminFlights from './screens/AdminFlights';
import ChosenFlights from './screens/ChosenFlights';
import ChooseSeatDepart from './screens/ChooseSeatDepart';
import ReservedFlights from './screens/ReservedFlights';
import UserSearch from './screens/UserSearch';
import ChooseSeatReturn from './screens/ChooseSeatReturn';
import ProfileHome from './screens/ProfileHome';
import ProfileBookings from './screens/ProfileBookings';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/admin/update/:id' component = {FlightUpdate} />
          <Route exact path='/summary/:id1/:id2/:passengerCount' component={ChosenFlights} />
          <Route exact path='/flights' component={UserSearch} />
          <Route exact path='/profile/home' component={ProfileHome} />
          <Route exact path='/profile/bookings' component={ProfileBookings} />
          <Route exact path='/booking/:bookingID/seats/depart' component={ChooseSeatDepart} />
          <Route exact path='/booking/:bookingID/seats/return' component={ChooseSeatReturn} />
          <Route exact path='/admin/create' component={CreateFlight} />
          <Route exact path='/admin' component={AdminHome} />
          <Route exact path='/admin/flights' component={AdminFlights} />
          <Route exact path='/reservations/:bookingID' component={ReservedFlights}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
