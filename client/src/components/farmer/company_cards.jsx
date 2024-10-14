

const company_cards = (props) => {
  return (
    <>
            <div className="card bg-base-100 w-96  shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{props.company.name}</h2>
            <p>Major Crop in Demand : {props.company.mjc}</p>
            <p>State : {props.company.state}</p>
            <div className="card-actions justify-end">
            <button className="btn bg-green-800 text-white">View Details</button>
            </div>
        </div>
        </div>
    </>
  )
}

export default company_cards
