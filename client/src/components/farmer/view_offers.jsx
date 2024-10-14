import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import MarketCards from "./market_Cards";
import OfferCards from "./offer_Cards";


export default function ViewOffers() {
  const location = useLocation();
  const { item } = location.state; 
  
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/farmer/viewOffers/${item._id}`, {
          method: 'GET',
          credentials: "include",
        });
  
        if (response.ok) {
          const result = await response.json();
          setOffers(result);
        } else {
          console.error('Error fetching offers');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOffers();
  }, [item._id]);

  return (
    <>
      <Navbar />
      <div className="whole_contents">
        <div className="add_to_market bg-green-800">
          {/* Market Item Card */}
          <MarketCards item={item} />

          <div className="view_offer">
            <h1>Offers on this Item</h1>
            <div className="offers flex flex-col gap-4">
              {offers.length > 0 ? (
                offers.map((offer, index) => (
                  <OfferCards key={index} offer={offer} id={item._id} weight={item.weight} />
                ))
              ) : (
                <p>Yet To Receive Offers</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
