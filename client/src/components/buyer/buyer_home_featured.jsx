import Navbar from "./navbar"
import './buyer_home_featured.css'
import Card from "./cards"
import { useEffect, useState } from "react"

const BuyerHomeFeatured = () => {

    const [market, setMarket] = useState([])

    useEffect(() => {
        const productList = async () => {
            const response = await fetch('http://localhost:4000/api/buyer/marketproduct', {
                method: 'GET',
                credentials:"include"
            })
            const result = await response.json()
            
            setMarket(result)
        }
        // Invoke the function
        productList()
    }, [])

    return (
        <>
            <Navbar />
            <div className="whole_contents">
                <div className="add_to_market">
                    <h1>Products In Market</h1>
                    <div className="cards_container">
                        {
                            market.length > 0 ? 
                            market.map((item) => (
                                <Card key={item._id} items={item} />
                            )) : 
                            'No Product in Market'
                        }
                    </div>
                    {/*<button id="add_item" onClick={handleAddClick}>+</button>*/}
                </div>
            </div>
        </>
    )
}

export default BuyerHomeFeatured
