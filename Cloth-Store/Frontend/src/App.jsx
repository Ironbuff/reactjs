import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import Clothdetail from "./components/clothdetail/Clothdetail"
import Login from "./pages/login/Login"
import {Provider} from 'react-redux'
import Store from "./store"
function App() {

  return (

    <Router>
      <Provider store={Store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Clothdetail />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
