import { useState } from 'react';
import './add_to_market_form.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';


const AddToMarketForm = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    crop: '',
    weight: '',
    cp: '',
    rate: '',
    description:'',
  });
  
 
  
  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response = await fetch('http://localhost:4000/api/buyer/market',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:JSON.stringify(formData),
    })
    const data = await response.json();
    if (data === 'Added To Market') {
        
        setTimeout(() => {
            navigate('/buyer_home/market_items'); // After 1 seconds, redirect to home
        }, 1000);
        
    } else {
        const errorData = await response.json();
        console.error('Error updating:', errorData);
    }
}

  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="form-section">
          <center><h1>Add Item to Market</h1></center>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cropName">Crop Name</label>
              <input
                type="text"
                id="cropName"
                name="crop"
                value={formData.crop}
                onChange={handleInputChange}
                placeholder="Enter Crop Name"
                className="input-field"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="amount">Amount in Kg</label>
              <input
                type="number"
                id="amount"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Enter Amount in Kg"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pricePerKg">Expected Cost Price per Kg</label>
              <input
                type="number"
                id="pricePerKg"
                name="cp"
                value={formData.sp}
                onChange={handleInputChange}
                placeholder="Enter Price per Kg"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating for Quality of Crop Required</label>
              <input
                type="number"
                id="rating"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                placeholder="Enter Rating (1-5)"
                className="input-field"
                required
              />
              <p className="note">
                Price may differ due to inappropriate quality of item
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="total">Description</label>
              <input
                type="text"
                id="totalAmount"
                name="description"
                value={formData.total}
                onChange={handleInputChange}
                placeholder="Enter Description"
                className="input-field"
                required
              />
            </div>


            <button type="submit" className="submit-btn">Add Item</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddToMarketForm;
