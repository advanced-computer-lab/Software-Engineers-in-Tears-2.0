import React, { Component } from 'react';
import './HomeScreen.css';
//import axios from 'axios';
import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <div>
        <header className="Home-Header"> 
            <h2 className="Header-Title">Sample Airlines</h2>
            <Link to="/signin" className="Header-Title">
              Sign In
            </Link>
        </header>
        <div className="Home-Body">
          
        </div>
    </div>
  );
}

export default HomeScreen;