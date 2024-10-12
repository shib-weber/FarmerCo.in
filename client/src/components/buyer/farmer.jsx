import Company_cards from "./farmer_cards"
import Navbar from "./navbar"
import './buyer_home_featured.css'
import { useEffect, useState } from "react"

const Farmers = () => {

  const [farmers, setFarmers] = useState([])

  useEffect(() => {

    const farmerList = async () => {
      const response = await fetch('http://localhost:4000/api/buyer/farmers', {
        method: 'GET'
      })
      const result = await response.json()
      setFarmers(result)
    }

    // Invoke the farmerList function
    farmerList()
  }, [])

  return (
    <>
      <Navbar />
      <div className="whole_contents">
        <div className="add_to_market">
          <h1>Farmers</h1>
          <div className="cards_container">
            {farmers.length > 0 ? 
              farmers.map((farmer) => (
                <Company_cards key={farmer._id} farmer={farmer} />
              )) :
              'No farmers Registered'
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Farmers
