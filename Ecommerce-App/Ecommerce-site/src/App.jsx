import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from './pages/card/Card';
import Customer from './pages/customer/Customer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Navbar />
      <Card/>
      <Customer/>
      <Footer/>
    </Router>
  );
}

export default App;
