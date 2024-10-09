import Navbar from "./navbar"
import './farmer_home_featured.css'
import Card from "./cards"
import Companies from "./companies"
import Market_demands from "./market_demands"

const farmer_home_featured = () => {
  return (
    <>
    <Navbar/>
    <div className="whole_contents">
        <div className="companies">
            <h1>Companies</h1>
            <Companies/>
            <Companies/>
            <Companies/>
            <Companies/>
            <Companies/>
            <Companies/>
            <Companies/>
        </div>
        <div className="add_to_market">
            <h1>Your Item In Market</h1>
                <div className="join">
                    <div>
                        <div>
                        <input className="input input-bordered join-item" placeholder="Search" />
                        </div>
                    </div>
                    <select className="select select-bordered join-item">
                        <option disabled selected>Filter</option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>
                    <div className="indicator">
                        <button className="btn join-item">Search</button>
                    </div>
                </div>
            <Card/>
            <Card/>
        </div>
        <div className="in_market">
            <h1>Market Demands</h1>
            <Market_demands/>
            <Market_demands/>
            <Market_demands/>
        </div>
    </div>
    </>
  )
}

export default farmer_home_featured
