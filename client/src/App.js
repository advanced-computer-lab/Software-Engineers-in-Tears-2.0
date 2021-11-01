import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import AdminHome from './screens/AdminHome';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/admin' component={AdminHome} />
        </div>
      </Router>
    );
  }
}

export default App;
