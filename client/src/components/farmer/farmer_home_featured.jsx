import Navbar from "./navbar"
import './farmer_home_featured.css'
import Market_Cards from "./market_Cards";
import { useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"


const farmer_home_featured = () => {
    const navigate = useNavigate()
    const handleAddClick =()=>{
        navigate('add_item')
    }

    const [items, setItems] = useState([]);

    useEffect(() => {
      const itemList = async () => {
        const response = await fetch('http://localhost:4000/api/farmer/getitems', {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        setItems(result);
      };
  
      itemList(); // Call the async function
    }, []);


  return (
    <>
    <Navbar/>
    <div className="whole_contents ">
        <div className="add_to_market bg-green-800 ">
            <h1>Your Items In Market</h1>
                <div className="cards_container">
                    {items.length > 0 ? (
                    items.map((item) => (
                        <Market_Cards key={item._id} item={item} />  // Make sure to return from map
                    ))
                    ) : (
                    <p>No items available</p>
                    )}
                </div>
                <button id="add_item" className="bg-gree-800" onClick={handleAddClick}>+</button>
        </div>
    </div>
    </>
  )
}

export default farmer_home_featured
