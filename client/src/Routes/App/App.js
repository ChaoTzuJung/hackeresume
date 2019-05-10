import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from '../../store';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser } from '../../actions/auth';

import Navbar from '../../layouts/Navbar';
import Landing from '../../layouts/Landing';
import Footer from '../../layouts/Footer';

import Register from '../../Routes/Register';
import Login from '../../Routes/Login';

import './App.css';

// 為了讓換頁或重整都有保存登入資料
// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and explanation
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenicated
  store.dispatch(setCurrentUser(decoded));
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;