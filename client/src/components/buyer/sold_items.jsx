import Navbar from "./navbar"
import Sold_Cards from "./sold_Cards"
import './buyer_home_featured.css'
import { useEffect, useState } from "react"

const SoldItems = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchSoldItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/buyer/bought', {
          method: 'GET',
          credentials:"include"
        })
        const result = await response.json()
        console.log(result); // Log the result to check if it's an array
        if (Array.isArray(result)) {
          setItems(result)
        } else {
          console.error("Expected an array, got:", result)
          setItems([]) // Set empty array if result is not an array
        }
      } catch (error) {
        console.error("Error fetching sold items:", error)
      }
    }
  
    fetchSoldItems()
  }, [])

  return (
    <>
      <Navbar />
      <div className="whole_contents">
        <div className="add_to_market">
          <h1>Order History</h1>
          <div className="cards_container">
            {items.length > 0 ? (
              items.map((item) => (
                <Sold_Cards key={item._id} item={item} />
              ))
            ) : (
              'No items bought'
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SoldItems
