import { useState } from "react";
import CardsDuringOffer from "./cards_during_offer";
import { useNavigate,useLocation } from "react-router-dom";
import Navbar from "./navbar";
import './buyer_offer_placement.css'
import './buyer_home_featured.css'

export default function BuyerOfferPlacement() {
  const location = useLocation();
  const { item } = location.state; 
  console.log(item)
  const navigate = useNavigate();
  
  const initial = {  
    price: item.sp,
  };

  const [offer, setOffer] = useState(initial);

  const handleChange = (e) => {
    setOffer({ ...offer, price: e.target.value }); // Update price state
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch(`http://localhost:4000/api/buyer/offerplacement/${item._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Make sure to set the content type
      },
      credentials: "include",
      body: JSON.stringify(offer),
    });

    const result = await response.json();

    if (result === 'done') {
      navigate('/buyer_home/offered_items');
    }
  };

  return (
    <>
      <Navbar/>
      <div className="whole_contents">
        <div className="add_to_market">
          <CardsDuringOffer items={item} />
          <div className="make_offer">
            <h1>Make Your Offer</h1>
            <p>If the offer is accepted by the Farmer, you can proceed to the next step</p>
            <form id="offer_form" onSubmit={handleOfferSubmit}>
              <div className="price">
                <label htmlFor="price">Price Per Kg</label>
                <input 
                  type="number" 
                  required 
                  value={offer.price} // Bind input value to state
                  onChange={handleChange} // Handle input changes
                />
              </div>
              <button type="submit">Submit Offer</button> {/* Add a submit button */}
            </form>
          </div>
        </div>
      </div>


    </>
  );
}
