import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import CreateFlight from './components/CreateFlight.js';
import AdminHome from './screens/AdminHome';
import AdminAllFlights from './screens/AdminAllFlights';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route exact path='/createflight' component={CreateFlight} />
          <Route path='/admin' component={AdminHome} />
          <Route path='/adminflights' component={AdminAllFlights} />
        </Switch>
      </Router>
    );
  }
}

export default App;
