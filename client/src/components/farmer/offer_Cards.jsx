const OfferCards = (props) => {
    return (
      <>
        <div className="card bg-base-100 shadow-xl relative">
  
          {/* Card body section */}
          <div className="p-4">
            <h2 className="text-2xl font-semibold">{props.offer.Cname}</h2>
            <p>Price Offered: {props.offer.price}</p>
            <p>Total : {props.sp * props.offer.price} </p>
            {/* Action buttons */}
            <div className="mt-4 flex justify-center">
              <button className="btn bg-red-800 text-white mr-2">Reject</button>
              <button className="btn bg-green-800 text-white">Confirm</button>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default OfferCards;
  