import { useNavigate } from "react-router-dom";
import farmerimg from '../../assets/farmer.webp';
import { useState } from 'react';

const OfferCards = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false); // State to track deleted status

  const handleClick = async () => {
    const response = await fetch(`http://localhost:4000/api/buyer/deleteoffer/${props.items._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);

    if (result === 'deleted') {
      setDeleted(true); // Mark item as deleted, which will remove it from UI
    } else {
      console.log('Error deleting');
    }
  };

  // If the item is deleted, do not display it
  if (deleted) {
    return null;
  }

  return (
    <>
      <div className="card bg-base-100 shadow-xl relative">
        {/* Image section */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={farmerimg}
            alt="Crop"
          />
        </div>
        
        {/* Card body section */}
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{props.items.name}</h2>
          <p>Crop: {props.items.crop}</p>
          <p>Total Amount in Kg: {props.items.weight}</p>
          <p>Selling Price per Kg: {props.items.sp}</p>
          <p>Rating: {props.items.rate}</p>
          <p className="break-words whitespace-normal">Description: {props.items.description}</p>
          
          {/* Conditional offer status */}
          {props.items.sold ? (
            props.items.buyerId === props.myid ? (
              <p className='text-green-600'>Offer Accepted</p>
            ) : (
              <p className='text-red-600'>Offer Rejected</p>
            )
          ) : (
            <p className='text-red-600'>Offer Pending</p>
          )}

          {/* Show the delete button only if the offer is pending */}
          {!props.items.sold && (
            <div className="mt-4 flex justify-end">
              <button className="btn bg-red-800 text-white" onClick={handleClick}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OfferCards;
