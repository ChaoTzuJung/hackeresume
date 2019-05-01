import React from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import Landing from './layouts/Landing';
import Footer from './layouts/Footer';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
