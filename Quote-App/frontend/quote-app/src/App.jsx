import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./pages/login/Login"
import { UserContextProvider } from "./User-Context";
import Register from "./pages/register/Register";
import Addquote from "./pages/addquote/Addquote";
import Home from "./pages/home/Home";
import Update from "./pages/update/Update";

function App() {
 

  return (
    <UserContextProvider>
      <Router>

        <Navbar/>
             <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/addquote" element={<Addquote/>}/>
                  <Route exact path="/" element={<Home/>}/>
                  <Route path="/edit/:id" element={<Update/>}/>
             </Routes>

      </Router>

    </UserContextProvider>
    
      

  )
}

export default App
