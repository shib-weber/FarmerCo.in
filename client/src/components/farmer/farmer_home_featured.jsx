import Navbar from "./navbar"
import './farmer_home_featured.css'
import Card from "./cards"
import { useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"


const farmer_home_featured = () => {
    const navigate = useNavigate()
    const handleAddClick =()=>{
        navigate('add_item')
    }


    const [market, setMarket] = useState([])

    useEffect(() => {
        const productList = async () => {
            const response = await fetch('http://localhost:4000/api/farmer/marketproduct', {
                method: 'GET'
            })
            const result = await response.json()
            setMarket(result)
        }
        // Invoke the function
        productList()
    }, [])


  return (
    <>
    <Navbar/>
    <div className="whole_contents">
        <div className="add_to_market">
            <h1>Market Demands</h1>
                <div className="join">
                    <div>
                        <div>
                        <input className="input input-bordered join-item" placeholder="Search" />
                        </div>
                    </div>
                    <div className="indicator">
                        <button className="btn join-item">Search</button>
                    </div>
                </div>
                <div className="cards_container">
                {
                            market.length > 0 ? 
                            market.map((item) => (
                                <Card key={item._id} items={item} />
                            )) : 
                            'No Product in Market'
                        }
                </div>
                <button id="add_item" onClick={handleAddClick}>+</button>
        </div>
    </div>
    </>
  )
}

export default farmer_home_featured
