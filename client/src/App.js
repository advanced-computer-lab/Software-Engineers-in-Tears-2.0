import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import CreateFlight from './components/CreateFlight.js';
import AdminHome from './screens/AdminHome';
import FlightUpdateScreen from './screens/FlightUpdateScreen';
import AdminFlights from './screens/AdminFlights';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route exact path='/admin/update/:id' component = {FlightUpdateScreen} />
          <Route exact path='/createflight' component={CreateFlight} />
          <Route exact path='/admin' component={AdminHome} />
          <Route eaxct path='/admin/flights' component={AdminFlights} />
        </Switch>
      </Router>
    );
  }
}

export default App;
