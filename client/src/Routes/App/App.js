import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // 新增 Provider
import store from '../../store'; // 新增 store

import Navbar from '../../layouts/Navbar';
import Landing from '../../layouts/Landing';
import Footer from '../../layouts/Footer';

import Register from '../../Routes/Register';
import Login from '../../Routes/Login';

import './App.css';

function App() {
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