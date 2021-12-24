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
import UserSearch from './screens/UserSearch';
import ChooseSeatReturn from './screens/ChooseSeatReturn';
import ProfileHome from './screens/ProfileHome';
import ProfileBookings from './screens/ProfileBookings';
import UserUpdate from './screens/UserUpdate';
import PaymentScreen from './screens/PaymentScreen';
import Signup from './screens/Signup';
import ChangePassword from './screens/ChangePassword';
import EditSeatDepart from './screens/EditSeatDepart';
import EditSeatReturn from './screens/EditSeatReturn';
import SearchNewDepart from './screens/SearchNewDepart';
import SearchResultsDepart from './screens/SearchResultsDepart';
import ModifyReturnBooking from './screens/ModifyReturnBooking';
import ModifyReturnBookingResults from './screens/ModifyReturnBookingResults';

class App extends Component {
  render() {
    return (

      <Router>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/admin/update/:id' component = {FlightUpdate} />
          <Route exact path='/summary/:id1/:id2/:passengerCount' component={ChosenFlights} />
          <Route exact path='/iternary/:id1/:id2/:passengerCount' component={ChosenFlights} />
          <Route exact path='/search/from=:from/to=:to/cabin=:cabin/p=:pcount/fromDate=:fromDate/toDate=:toDate' component={UserSearch} />
          <Route exact path='/search/from=:from/to=:to/cabin=:cabin/p=:pcount/fromDate=:fromDate/editDepart' component={SearchResultsDepart} />
          <Route exact path='/search/from=:from/to=:to/cabin=:cabin/p=:pcount/fromDate=:fromDate/editReturn' component={ModifyReturnBookingResults} />
          <Route exact path='/searchDepart' component={SearchNewDepart} />
          <Route exact path='/searchReturn' component={ModifyReturnBooking} />
          <Route exact path='/profile/home' component={ProfileHome} />
          <Route exact path='/profile/bookings' component={ProfileBookings} />
          <Route exact path='/profile/changepassword' component={ChangePassword} />
          <Route exact path='/profile/account' component={UserUpdate} />
          <Route exact path='/booking/:bookingID/seats/depart' component={ChooseSeatDepart} />
          <Route exact path='/booking/:bookingID/seats/depart/edit' component={EditSeatDepart} />
          <Route exact path='/booking/:bookingID/seats/return' component={ChooseSeatReturn} />
          <Route exact path='/booking/:bookingID/seats/return/edit' component={EditSeatReturn} />
          <Route exact path='/booking/payment' component={PaymentScreen} />
          <Route exact path='/booking/iternary'  />
          <Route exact path='/admin/create' component={CreateFlight} />
          <Route exact path='/admin' component={AdminHome} />
          <Route exact path='/admin/flights' component={AdminFlights} />
        </Switch>
      </Router>
    );
  }
}

export default App;
