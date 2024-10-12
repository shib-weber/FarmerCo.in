
const sold_Cards = () => {
  return (
    <>
                <div className="card card-side bg-base-100 shadow-xl -z-2">
          <figure>
              <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie" />
          </figure>
          <div className="card-body">
              <h2 className="card-title">Company!</h2>
              <p>Click the button to sell .</p>
              
              <div className="card-actions justify-end">
              <button className="btn bg-green-800 text-white">Sold</button>
              </div>
          </div>
          </div>
    </>
  )
}

export default sold_Cards
