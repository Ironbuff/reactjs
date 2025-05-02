import React, { useEffect } from "react"
import Navbar from "./components/navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import AllBooks from "./pages/all-books/AllBooks"
import SignIn from "./pages/signin/SignIn"
import Login from "./pages/login/Login"
import Bookdetail from "./components/bookdetail/Bookdetail"
import { authActions } from "./store/auth"
import { useDispatch, useSelector } from "react-redux"
import Profile from "./pages/profile/Profile"
import Orderhistory from "./components/profile/Orderhistory"
import Settings from "./components/profile/Settings"
import Favourite from "./components/profile/Favourite"
import Cart from "./pages/cart/Cart"
import Orders from "./pages/all-orders/Orders"
import Addbook from "./pages/add-book/Addbook"
import Update from "./pages/update-book/Update"


function App() {

  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role) //set the role of user

  useEffect(() => {

    if (
      localStorage.getItem('id') && localStorage.getItem('token') && localStorage.getItem('role')
    ) {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }

  }, [])


  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/book" element={<AllBooks />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-book-detail/:id" element={<Bookdetail />} />
        <Route path="/profile" element={<Profile />}>
          {role==="user"?<Route index element={<Favourite />} />: <Route index element={<Orders/>}/>}
          {role==="admin"&& <Route path="books" element={<Addbook/>}/>}
          <Route path="order" element={<Orderhistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
      <Footer />
    </>



  )
}

export default App
