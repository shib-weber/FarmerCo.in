import './App.css'
import { Route, Routes } from "react-router-dom"
import SignUp from './components/account/signup'
import Login from './components/account/login'
import FarmerRoutes from './components/farmer/FarmerRoutes'
import BuyerRoutes from './components/buyer/Buyer_routes'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        {FarmerRoutes()}
        {BuyerRoutes()}
      </Routes>
    </>
  )
}

export default App
