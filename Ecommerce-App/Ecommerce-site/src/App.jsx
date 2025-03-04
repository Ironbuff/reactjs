import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from './components/Card';
import Customer from './components/Customer';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/card" element={<Card />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;
