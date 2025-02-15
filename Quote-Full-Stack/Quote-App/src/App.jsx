import React from 'react'
import Signup from './pages/Signup'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <> 
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    <ToastContainer />

    </Router>
    </>
  )
}

export default App
