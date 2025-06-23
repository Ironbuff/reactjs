import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Clothdetail from "./components/clothdetail/Clothdetail";
import Login from "./pages/login/Login";
import { Provider } from 'react-redux';
import Store from "./store";
import Sign from "./pages/signin/Sign";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import Total from "./components/order/Total";
import Allorder from "./components/order/Allorder";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Add from "./components/addcloth/Add";
import Shop from "./pages/shop/Shop";

// ✅ Component containing logic now *inside* Provider
const AppContent = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('id') &&
      localStorage.getItem('role')
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Clothdetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="order" element={<Allorder />} />
          <Route path="total" element={<Total />} />
        </Route>
        {role === "admin" && (
          <Route path="/add" element={<Add />} />
        )}
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <Provider store={Store}>
        <AppContent />
      </Provider>
    </Router>
  );
}

export default App;
