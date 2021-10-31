import React, { Component } from 'react';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
