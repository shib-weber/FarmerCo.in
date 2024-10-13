import { Route } from "react-router-dom"
import Buyer_Home from './buyer_home'
import Add_to_market_form from './add_to_market_form'
import Market_items from './market_items'
import Sold_items from "./sold_items"
import BuyerOfferPlacement from "./buyer_offer_placement"
import OfferedItems from "./offered_items"
{/*
import Offered_items from './offered_items'

import Sold_items from './sold_items'
import FarmersForum from './farmers_forum'
*/}
import Profile from './profile'
import ProtectedRoute from './protected_routes'

const BuyerRoutes = () => {
  return (
    <>
      <Route path='/buyer_home' element={<ProtectedRoute><Buyer_Home /></ProtectedRoute>} />
      <Route path='/buyer_home/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/buyer_home/add_item' element={<ProtectedRoute><Add_to_market_form /></ProtectedRoute>} />
      <Route path='/buyer_home/market_items' element={<ProtectedRoute><Market_items /></ProtectedRoute>} />
      <Route path='/buyer_home/buy_items' element={<ProtectedRoute><Sold_items /></ProtectedRoute>} />
      <Route path='/buyer_home/offer' element={<ProtectedRoute><BuyerOfferPlacement /></ProtectedRoute>} />
      <Route path='/buyer_home/offered_items' element={<ProtectedRoute><OfferedItems/></ProtectedRoute>}/>
{ /*     
      <Route path='/farmer_home/offered_items' element={<ProtectedRoute><Offered_items /></ProtectedRoute>} />
      
      
      <Route path='/farmer_home/farmers_forum' element={<ProtectedRoute><FarmersForum /></ProtectedRoute>} />
      */}
    </>
  )
}

export default BuyerRoutes
