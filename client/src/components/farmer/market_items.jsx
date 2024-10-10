import Navbar from "./navbar"
import Market_Cards from "./market_Cards"
import './farmer_home_featured.css'

const market_items = () => {
  return (
    <>
        <Navbar/>
        <div className="whole_contents">
            <div className="add_to_market">
                <h1>Your Items in Market</h1>
                    <div className="cards_container">
                        <Market_Cards/>
                        <Market_Cards/>
                        <Market_Cards/>
                    </div>
            </div>
        </div>
    </>
  )
}

export default market_items
