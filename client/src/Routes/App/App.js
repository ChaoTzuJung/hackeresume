import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from '../../store';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/auth';
import { clearCurrentProfile } from '../../actions/profile';

import Navbar from '../../layouts/Navbar';
import Landing from '../../layouts/Landing';
import Footer from '../../layouts/Footer';

import Register from '../Register';
import Login from '../Login';
import Dashboard from '../Dashboard';

import './App.css';

// 為了讓換頁或重整都有保存登入資料，而且當直接開啟首頁不用再登入，因為token還沒過期
// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and explanation
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenicated
  store.dispatch(setCurrentUser(decoded));

  // Check for expire token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login (來自原生js的處理，手動地址跳轉)
    window.location.href = '/login';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;