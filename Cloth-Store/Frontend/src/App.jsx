import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import Clothdetail from "./components/clothdetail/Clothdetail"
import Login from "./pages/login/Login"
import { Provider } from 'react-redux'
import Store from "./store"
import Sign from "./pages/signin/Sign"
import Cart from "./pages/cart/Cart"
import Profile from "./pages/profile/Profile"
import Total from "./components/order/Total"
import Allorder from "./components/order/Allorder"
function App() {

  return (

    <Router>
      <Provider store={Store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Clothdetail />} />
          <Route path='/login' element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/cart" element={<Cart />} />
          {/* Nest routes under profile */}
      <Route path="/profile" element={<Profile />}>
        <Route path="order" element={<Allorder />} />
        <Route path="total" element={<Total />} />
      </Route>

        </Routes>
      </Provider>
    </Router>
  )
}

export default App
