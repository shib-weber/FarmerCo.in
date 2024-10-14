import Navbar from "./navbar"
import Sold_Cards from "./sold_Cards"
import './farmer_home_featured.css'
import { useEffect, useState } from "react"


const Sold_items = () => {

  const [items, setItems] = useState([])

  useEffect(()=>{
    const getsolditems = async()=>{
      const response = await fetch('http://localhost:4000/api/farmer/solditems',{
        method:"GET",
        credentials:"include"
      })
      const result = await response.json();
      setItems(result)
    }

    getsolditems();

  },[])
  return (
    <>
          <Navbar/>
    <div className="whole_contents">
        <div className="add_to_market bg-green-800">
            <h1>Items You Sold</h1>
                <div className="cards_container">
                  {items.length > 0 ?
                  items.map((item)=>
                    <Sold_Cards key={item._id} items={item} />
                  ) :
                  'No Item Sold yet'
                  }
                    
                </div>
        </div>
    </div>
    </>
  )
}

export default Sold_items
