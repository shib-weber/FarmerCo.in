import officeimg from '../../assets/office.webp'

const cards = (props) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl relative">
        {/* Image section */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={officeimg}
            alt="Crop"
          />
        </div>
        
        {/* Card body section */}
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{props.items.name}</h2>
          <p>Crop: {props.items.crop}</p>
          <p>Amount: {props.items.weight} Kg</p>
          <p>Price Offered Per Kg: ₹{props.items.cp}</p>
          <p className="break-words">Description: {props.items.description}</p>
          
          <div className="mt-4 flex justify-end">
            <button className="btn bg-green-800 text-white">Offer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default cards;
