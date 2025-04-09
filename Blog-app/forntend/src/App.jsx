import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { UserContextProvider } from './User-Context'
import CreatePost from './pages/createpost/CreatePost'
import Postpage from './pages/post/Postpage'
import Updatepost from './pages/updatepost/Updatepost'
function App() {


  return (
    <UserContextProvider>
        <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/post/:id' element={<Postpage/>}/>
        <Route path='/edit/:id' element={<Updatepost/>}/>
      </Routes>

      </Router>
    </UserContextProvider>
   
  )
}

export default App
