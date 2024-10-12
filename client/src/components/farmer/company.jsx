import Company_cards from "./company_cards"
import Navbar from "./navbar"
import './farmer_home_featured.css'
import { useEffect, useState } from "react"

const company = () => {

  const [companies, setCompanies] = useState([])

  useEffect(() => {

    const farmerList = async () => {
      const response = await fetch('http://localhost:4000/api/farmer/companies', {
        method: 'GET'
      })
      const result = await response.json()
      setCompanies(result)
    }

    // Invoke the farmerList function
    farmerList()
  }, [])

  return (
    <>
      <Navbar/>
      <div className="whole_contents">
          <div className="add_to_market">
              <h1>Companies</h1>
                  <div className="cards_container">
                  {companies.length > 0 ? 
                  companies.map((company) => (
                  <Company_cards key={company._id} company={company} />
                )) :
                'No Company Registered'
              }
                  </div>
          </div>
      </div>
    </>
  )
}

export default company
