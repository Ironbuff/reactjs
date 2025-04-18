import React, { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Task from './components/task/Task'
import Create from './components/create/Create'
import Update from './components/update/Update'
function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Task/>}/>
      <Route path='/create' element={<Create/>}/>
      {/* Since in the link we use data.id to identify unique task so we have to add :id in the path as well */}
      <Route path='/update/:id' element={<Update/>}/>
    </Routes>
   </Router>
  )
}

export default App
