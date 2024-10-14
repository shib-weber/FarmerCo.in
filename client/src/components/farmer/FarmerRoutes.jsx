import { Route } from "react-router-dom"
import Farmer_Home from './farmer_home'
import Add_to_market_form from './add_to_market_form'
import Offered_items from './offered_items'
import Sold_items from './sold_items'
import Company from './company'
import ViewOffers from "./view_offers"
import FarmersForum from './farmers_forum'
import Profile from './profile'
import ProtectedRoute from './protected_routes'

const FarmerRoutes = () => {
  return (
    <>
      <Route path='/farmer_home' element={<ProtectedRoute><Farmer_Home /></ProtectedRoute>} />
      <Route path='/farmer_home/add_item' element={<ProtectedRoute><Add_to_market_form /></ProtectedRoute>} />
      <Route path='/farmer_home/offered_items' element={<ProtectedRoute><Offered_items /></ProtectedRoute>} />
      <Route path='/farmer_home/sold_items' element={<ProtectedRoute><Sold_items /></ProtectedRoute>} />
      <Route path='/farmer_home/companies' element={<ProtectedRoute><Company /></ProtectedRoute>} />
      <Route path="/farmer_home/view_offers" element={<ProtectedRoute><ViewOffers/></ProtectedRoute>}/>
      <Route path='/farmer_home/farmers_forum' element={<ProtectedRoute><FarmersForum /></ProtectedRoute>} />
      <Route path='/farmer_home/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </>
  )
}

export default FarmerRoutes
