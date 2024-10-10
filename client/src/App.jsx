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

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/farmer_home' element={<Farmer_Home/>} />
      <Route path='/farmer_home/add_item' element={<Add_to_market_form/>} />
      <Route path='/farmer_home/offered_items' element={<Offered_items/>} />
      <Route path='/farmer_home/market_items' element={<Market_items/>} />
      <Route path='/farmer_home/sold_items' element={<Sold_items/>} />
      <Route path='/farmer_home/companies' element={<Company/>} />
      <Route path='/farmer_home/farmers_forum' element={<FarmersForum/>} />
    </Routes>
    </>
  )
}

export default App
