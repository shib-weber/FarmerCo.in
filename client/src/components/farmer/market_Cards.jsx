import { useNavigate } from "react-router-dom";
import farmerimg from '../../assets/farmer.webp'
import { useState} from 'react';

const MarketCards = (props) => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  const handleViewOffers = () => {
    navigate('/farmer_home/view_offers',{ state: { item: props.item } });
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/farmer/deleteitem/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result === 'deleted') {
      setDeleted(true);
    }
  };
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
          <h2 className="text-2xl font-semibold">{props.item.name}</h2>
          <p>Crop: {props.item.crop}</p>
          <p>Amount: {props.item.weight} Kg</p>
          <p>Selling Price per Kg: ₹{props.item.sp}</p>
          <p className="break-words">Description: {props.item.description}</p>
          <p  className="text-2xl font-semibold ">Total Amount: ₹{props.item.sp * props.item.weight}</p>

          <div className="mt-4 flex justify-end">
            <button
              className="btn bg-red-800 text-white mr-2"
              onClick={() => handleDelete(props.item._id)}
            >
              Delete
            </button>
            <button
              className="btn bg-green-800 text-white"
              onClick={handleViewOffers}
            >
              View Offers
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCards;
