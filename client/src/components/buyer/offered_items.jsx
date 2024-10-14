import Navbar from "./navbar";
import OfferCards from "./offer_Cards";  // Ensure OfferCards is correctly imported in PascalCase
import './buyer_home_featured.css';
import { useEffect, useState } from "react";

const OfferedItems = () => {
  const [items, setItems] = useState([]);
  const [myid, setMyid] = useState("");
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);      // Add error state

  useEffect(() => {
    const getOfferedItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/buyer/offerproduct', {
          method: 'GET',
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');  // Handle non-200 responses
        }

        const { result, myid } = await response.json();
        console.log(result)
        setItems(result);
        setMyid(myid);
      } catch (err) {
        setError(err.message);  // Set error message
      } finally {
        setLoading(false);  // Stop loading when data is fetched
      }
    };

    getOfferedItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="whole_contents">
        <div className="add_to_market">
          <h1>Items You Offered</h1>
          <div className="cards_container">
            {loading ? (
              <p>Loading items...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : items.length > 0 ? (
              items.map((item) => (
                <OfferCards key={item._id} items={item} myid={myid} />
              ))
            ) : (
              <p>You Haven't Offered Any Item</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferedItems;
