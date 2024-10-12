import Navbar from "./navbar"
import Sold_Cards from "./sold_Cards"
import './farmer_home_featured.css'

const sold_items = () => {
  return (
    <>
          <Navbar/>
    <div className="whole_contents">
        <div className="add_to_market">
            <h1>Items You Sold</h1>
                <div className="cards_container">
                    <Sold_Cards/>
                    <Sold_Cards/>
                    <Sold_Cards/>
                </div>
        </div>
    </div>
    </>
  )
}

export default sold_items
