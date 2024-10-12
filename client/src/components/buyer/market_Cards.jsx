import { useNavigate } from "react-router-dom"

const market_Cards = (props) => {
  console.log(props)
    const navigate = useNavigate()
    const handleViewOffers =()=>{
        navigate('/farmer_home/view_offers')
    }

    const handleDelete =async(id)=>{
      const response = await fetch(`http://localhost:4000/api/buyer/deleteitem/${id}`,{
        method:'DELETE'
      })
      const result = await response.json()
      if(result === 'deleted'){
        
        navigate('/buyer_home/market_items')
      }
    }


  return (
    <>
        <div className="card card-side bg-base-100 shadow-xl -z-2">
          <figure>
              <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie" />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{props.item.name}</h2>
              <p>Crop : {props.item.crop}</p>
              <p>Amount in Kg {props.item.weight}</p>
              <p>Quality Required : {props.item.rate}</p>
              <p>Selling Price {props.item.cp}</p>
              <p className="break-words whitespace-normal">Description {props.item.description}</p>
              <p>Total Amount : {props.item.cp * props.item.weight}</p>
              
              <div className="card-actions justify-end">
              <button className="btn bg-red-800 text-white" onClick={() => handleDelete(props.item._id)}>Delete</button>
              <button className="btn bg-green-800 text-white" onClick={handleViewOffers}>View Offers</button>
              </div>
          </div>
        </div>
    </>
  )
}

export default market_Cards
