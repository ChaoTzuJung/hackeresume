import React from 'react';
import { browserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Navbar from './layouts/Navbar';
import Landing from './layouts/Landing';
import Footer from './layouts/Footer';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <Landing />
          <Footer />
        </div>
      </Router>
  );
}

export default App;