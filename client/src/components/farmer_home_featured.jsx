import Navbar from "./navbar"
import './farmer_home_featured.css'
import Card from "./cards"

const farmer_home_featured = () => {
  return (
    <>
    <Navbar/>
    <div className="whole_contents">
        <div className="companies">
            <h1>Companies</h1>
        </div>
        <div className="add_to_market">
            <h1>Your Item In Market</h1>
        </div>
        <div className="in_market">
            <Card/>
            <Card/>
        </div>
    </div>
    </>
  )
}

export default farmer_home_featured
