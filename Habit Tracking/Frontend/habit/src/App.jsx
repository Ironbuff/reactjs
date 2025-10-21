import React, { useEffect } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Habit from "./components/habit/Habit"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from 'react-redux'
import { authAction } from "./store/auth"
import AddnewHabit from "./pages/addhabit/Addhabit"
import HabitEdit from "./components/habitEdit/HabitEdit"
import VerifyEmailPassword from "./pages/resethabit/Forget"
import ResetPassword from "./components/reset-password/ResetPassword"

function App() {
  const queryClient = new QueryClient()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(localStorage.getItem('accessToken')&& localStorage.getItem('id'))
    {
      dispatch(authAction.login())
    }
  },[])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Habit />} />
            <Route path="/habit" element={<AddnewHabit/>}/>
            <Route path="/edit/:id" element={<HabitEdit/>}/>
           < Route path="/forgot-password" element={<VerifyEmailPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
