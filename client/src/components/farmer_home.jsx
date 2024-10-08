import Farmerbasicdetails from "./farmer_basic_details";
import Farmerhomefeatured from "./farmer_home_featured";

const farmer_home = () => {
    const isdetails = true

  return (
    <>
      { isdetails ? <Farmerhomefeatured/> : <Farmerbasicdetails/>}
    </>
  )
}

export default farmer_home
