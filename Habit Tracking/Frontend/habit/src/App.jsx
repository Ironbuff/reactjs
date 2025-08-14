import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Habit from "./components/habit/Habit"

function App() {
const queryClient = new QueryClient()

  return (
    <>
        <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar/>
        <Habit/>
      </Router>
      </QueryClientProvider>
    
    </>
  )
}

export default App
