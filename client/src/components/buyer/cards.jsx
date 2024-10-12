

const cards = (props) => {
  return (
    <>
        <div className="card card-side bg-base-100 shadow-xl -z-2">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{props.items.name}</h2>
            <p>Crop: {props.items.crop}</p>
            <p>Total Amount in Kg: {props.items.weight}</p>
            <p>Selling Price per Kg: {props.items.sp}</p>
            <p>Rating: {props.items.rate}</p>
            <p className="break-words whitespace-normal">Description: {props.items.description}</p>
            <div className="card-actions justify-end">
            <button className="btn bg-violet-800 text-white">Offer</button>
            </div>
        </div>
        </div>
    </>
  )
}

export default cards
