import Navbar from "./navbar"
import Offer_cards from "./offer_Cards"
import './buyer_home_featured.css'
import { useEffect, useState } from "react"

const offered_items = () => {
  const [items , setItems] =useState([])
  const [myid , setMyid] =useState("")

  useEffect(()=>{

    const getOfferedItems=async()=>{
      const response = await fetch('http://localhost:4000/api/buyer/offerproduct',{
        method:'GET',
        credentials:"include"
      })
      const {result , myid} = await response.json();
      setItems(result)
      setMyid(myid)
    }

    getOfferedItems()
  }, [])
  return (
    <>
    <Navbar/>
    <div className="whole_contents">
        <div className="add_to_market">
            <h1>Items You Offered</h1>
                <div className="cards_container">
                    
                    {
                      items.length > 0 ?
                      items.map((item)=>(
                        <Offer_cards key={item._id} items={item} myid={myid}/>
                      )) :
                      'You Haven`t Offered Any Item'
                    }
                </div>
        </div>
    </div>
    </>
  )
}

export default offered_items
