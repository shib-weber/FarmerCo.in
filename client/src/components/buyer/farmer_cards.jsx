

const farmer_cards = (props) => {
  return (
    <>
      <div className="card bg-base-100 w-96  shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{props.farmer.name}</h2>
            <p>State : {props.farmer.state}</p>
            <p>Major Cultivator : {props.farmer.mjc}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">View Details</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default farmer_cards
