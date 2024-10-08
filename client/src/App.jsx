import './App.css'
import { Route, Routes } from "react-router-dom"
import SignUp from './components/signup'
import Login from './components/login'
import Farmer_Home from './components/farmer_home'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/farmer_home' element={<Farmer_Home/>} />
    </Routes>
    </>
  )
}

export default App
