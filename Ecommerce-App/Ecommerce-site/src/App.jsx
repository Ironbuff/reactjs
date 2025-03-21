import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from './pages/card/Card';
import Customer from './pages/customer/Customer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductPage from './pages/products/Products';
import Contact from './pages/contact/Contact';
import Laptop from './pages/laptop/Laptop';
import Home from './pages/home/Home';
import Iphone from './pages/iphone/Iphone';

function App() {
  return (
    <Router>
      {/* Navbar displayed on all pages */}
      <Navbar />
      
      <Routes>
        {/* Route for Product Page - only displays ProductPage */}
        <Route path="/products" element={<ProductPage />} />
        
        {/* Default route - displays Card and Customer components */}
        <Route path="/*" element={
          <>
            <Card />
            <Customer />
          </>
        } />
        {/* Route for Contact Page */}
        <Route path="/contact" element={<Contact/>}/>
        {/* Route for Laptop Page */}
        <Route path='/laptop' element={<Laptop/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/iphone' element={<Iphone/>}/>
      </Routes>
      
      {/* Footer displayed on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
