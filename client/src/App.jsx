import './App.css'
import { Route, Routes } from "react-router-dom"
import SignUp from './components/account/signup'
import Login from './components/account/login'
import Farmer_Home from './components/farmer/farmer_home'
import Add_to_market_form from './components/farmer/add_to_market_form'
import Offered_items from './components/farmer/offered_items'
import Market_items from './components/farmer/market_items'
import Sold_items from './components/farmer/sold_items'
import Company from './components/farmer/company'
import FarmersForum from './components/farmer/farmers_forum'
import Profile from './components/farmer/profile'
import ProtectedRoute from './protected_routes'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/farmer_home' element={<ProtectedRoute><Farmer_Home /></ProtectedRoute>} />
      <Route path='/farmer_home/add_item' element={<ProtectedRoute><Add_to_market_form /></ProtectedRoute>} />
      <Route path='/farmer_home/offered_items' element={<ProtectedRoute><Offered_items /></ProtectedRoute>} />
      <Route path='/farmer_home/market_items' element={<ProtectedRoute><Market_items /></ProtectedRoute>} />
      <Route path='/farmer_home/sold_items' element={<ProtectedRoute><Sold_items /></ProtectedRoute>} />
      <Route path='/farmer_home/companies' element={<ProtectedRoute><Company /></ProtectedRoute>} />
      <Route path='/farmer_home/farmers_forum' element={<ProtectedRoute><FarmersForum /></ProtectedRoute>} />
      <Route path='/farmer_home/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
