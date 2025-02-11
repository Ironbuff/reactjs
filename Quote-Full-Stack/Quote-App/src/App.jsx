import React from 'react'
import Signup from './pages/Signup'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <> 
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
     <Signup/>

    </Router>
    </>
  )
}

export default App
