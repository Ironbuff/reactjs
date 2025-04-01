import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Login from "./components/pages/login/Login";
import SignIn from "./components/pages/signin/Signin";
import Todo from "./components/pages/todo/Todo";
import Update from "./components/pages/todo/update/update";
import { useDispatch } from 'react-redux';
import { authActions } from "./store";


function App() {
  
   const dispatch =useDispatch(); // Used to dispatch actions to the Redux store and allow to update global state defined in redux
  

  useEffect(()=>{
   const id = sessionStorage.getItem("id")
    if(id){
      dispatch(authActions.loggin()); //convert value of is loggin from false to true
    }
  },[dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
