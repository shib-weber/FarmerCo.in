import Navbar from "./navbar"
import Offer_cards from "./offer_Cards"
import './farmer_home_featured.css'

const offered_items = () => {
  return (
    <>
    <Navbar/>
    <div className="whole_contents">
        <div className="add_to_market">
            <h1>Items You Offered</h1>
                <div className="cards_container">
                    <Offer_cards/>
                    <Offer_cards/>
                    <Offer_cards/>
                </div>
        </div>
    </div>
    </>
  )
}

export default offered_items
