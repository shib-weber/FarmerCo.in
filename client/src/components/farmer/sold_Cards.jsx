import { useEffect, useState } from 'react'
import officeimg from '../../assets/office.webp'



const Sold_Cards = (props) => {

  const [offer, setOffer]= useState({})

  useEffect(()=>{

    const getOffer = async ()=>{
      const response= await fetch(`http://localhost:4000/api/farmer/offerc/${props.items._id}`,{
        method:"GET",
        credentials:"include"
      })
      const result = await response.json()
      setOffer(result)
    }

    getOffer()
  },[])



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
          <h2 className="text-2xl font-semibold">Sold To : {offer.Cname}</h2>
          <p>Crop: {props.items.crop}</p>
          <p>Amount: {props.items.weight} Kg</p>
          <p>Final Sold Price: ₹{offer.price}</p>
          <p className="break-words">Description: {props.items.description}</p>
          <h2 className="text-2xl font-semibold">Total Amount: {props.items.weight * offer.price}</h2>
          <div className="mt-4 flex justify-end">
            <button className="btn bg-green-800 text-white">Sold</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sold_Cards
