import Navbar from "./navbar"
import './farmer_home_featured.css'
import Card from "./cards"
import { useNavigate } from "react-router-dom"


const farmer_home_featured = () => {
    const navigate = useNavigate()
    const handleAddClick =()=>{
        navigate('add_item')
    }
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
                    <select className="select select-bordered join-item">
                        <option disabled selected>Filter</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <div className="indicator">
                        <button className="btn join-item">Search</button>
                    </div>
                </div>
                <div className="cards_container">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <button id="add_item" onClick={handleAddClick}>+</button>
        </div>
    </div>
    </>
  )
}

export default farmer_home_featured
