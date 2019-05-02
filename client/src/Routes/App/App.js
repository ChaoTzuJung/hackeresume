import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Navbar from '../../layouts/Navbar';
import Landing from '../../layouts/Landing';
import Footer from '../../layouts/Footer';

import Register from '../../Routes/Register';
import Login from '../../Routes/Login';

function App() {
  return (
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
  );
}

export default App;