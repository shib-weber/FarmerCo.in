import { useNavigate } from "react-router-dom";
import farmerimg from '../../assets/farmer.webp'

const cards = (props) => {
  const navigate = useNavigate()

  const handleClick =()=>{
    navigate('/buyer_home/offer', { state: { item: props.items } });

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
            <h2 className="text-2xl font-semibold">Total Price : {props.items.weight * props.items.sp}</h2>
          <div className="mt-4 flex justify-end">
          <button className="btn bg-violet-800 text-white" onClick={handleClick}>Offer Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default cards;
