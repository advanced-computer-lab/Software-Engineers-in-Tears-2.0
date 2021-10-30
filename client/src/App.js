import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './components/HomeScreen';
import SignInScreen from './components/SignInScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/signin' component={SignInScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
