import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import AdminHome from './screens/AdminHome';
import AdminAllFlights from './screens/AdminAllFlights';
import FlightUpdateScreen from './screens/FlightUpdateScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/admin' component={AdminHome} />
          <Route path='/adminflights' component={AdminAllFlights} />
          <Route exact path='/update-flight/:id' component = {FlightUpdateScreen} />
        </Switch>
      </Router>
    );
  }
}

export default App;
