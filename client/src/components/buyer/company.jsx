import Company_cards from "./company_cards"
import Navbar from "./navbar"
import './farmer_home_featured.css'

const company = () => {
  return (
    <>
                <Navbar/>
    <div className="whole_contents">
        <div className="add_to_market">
            <h1>Companies</h1>
                <div className="cards_container">
                    <Company_cards/>
                    <Company_cards/>
                    <Company_cards/>
                </div>
        </div>
    </div>
    </>
  )
}

export default company
