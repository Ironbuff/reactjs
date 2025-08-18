import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Habit from "./components/habit/Habit"
import Login from "./pages/login/Login"

function App() {
const queryClient = new QueryClient()

  return (
    <>
        <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Habit/>}/>
        </Routes>
      </Router>
      </QueryClientProvider>
    
    </>
  )
}

export default App
