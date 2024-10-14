import { useNavigate } from "react-router-dom";

const OfferCards = (props) => {
  const navigate = useNavigate()

  const handleClick=async()=>{
    const response = await fetch('http://localhost:4000/api/farmer/updatesold',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', // Added headers
      },
      credentials: "include",
      body: JSON.stringify({ offerId: props.id , Cid:props.offer.Cid })
    })
    const result = await response.json();
    if(result.message === 'done'){
      navigate('/farmer_home')
    }
  }
    return (
      <>
        <div className="card bg-base-100 shadow-xl relative">
  
          {/* Card body section */}
          <div className="p-4">
            <h2 className="text-2xl font-semibold">{props.offer.Cname}</h2>
            <p  className="text-xl" >Price Offered per Kg: {props.offer.price}</p>
            <p  className="text-2xl font-semibold " >Total : {props.weight * props.offer.price} </p>
            {/* Action buttons */}
            <div className="mt-4 flex justify-center">
              <button className="btn bg-green-800 text-white" onClick={handleClick}>Confirm</button>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default OfferCards;
  