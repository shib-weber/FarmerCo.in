import { useEffect, useState } from "react";
import Farmerbasicdetails from "./farmer_basic_details";
import Farmerhomefeatured from "./farmer_home_featured";

const FarmerHome = () => {
  const [isDetails, setIsDetails] = useState(false); // useState to handle whether details exist

  // useEffect to run the fetch logic on page load
  useEffect(() => {
    const page = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/farmer/checkdetails', {
          method: 'GET',
          credentials: 'include', // This ensures cookies (JWT token) are included
        });
        const result = await response.json();
        
        if (result === 'yes') {
          setIsDetails(true); // Update state if details exist
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    page(); // Call the async function
  }, []); // Empty dependency array means this will run on mount

  return (
    <>
      {isDetails ? <Farmerhomefeatured /> : <Farmerbasicdetails />}
    </>
  );
};

export default FarmerHome;
