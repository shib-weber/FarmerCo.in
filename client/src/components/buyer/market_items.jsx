import Navbar from "./navbar";
import Market_Cards from "./market_Cards";
import './buyer_home_featured.css';
import { useEffect, useState } from "react";

const MarketItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemList = async () => {
      const response = await fetch('http://localhost:4000/api/buyer/getitems', {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setItems(result);
    };

    itemList(); // Call the async function
  }, []);

  return (
    <>
      <Navbar />
      <div className="whole_contents">
        <div className="add_to_market">
          <h1>Your Items in Market</h1>
          <div className="cards_container">
            {items.length > 0 ? (
              items.map((item) => (
                <Market_Cards key={item._id} item={item} />  // Make sure to return from map
              ))
            ) : (
              <p>No items available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketItems;
