import { useState } from 'react';
import './add_to_market_form.css';
import Navbar from './navbar';

const AddToMarketForm = () => {
  const [formData, setFormData] = useState({
    cropName: '',
    amount: '',
    pricePerKg: '',
    rating: '',
    totalAmount: '',
  });
  
  const [photos, setPhotos] = useState([]);
  
  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoUrls = files.map(file => URL.createObjectURL(file));
    setPhotos([...photos, ...photoUrls]);
  };

  // Handle photo removal
  const handleRemovePhoto = (indexToRemove) => {
    const updatedPhotos = photos.filter((_, index) => index !== indexToRemove);
    setPhotos(updatedPhotos);
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="form-section">
          <center><h1>Add Item to Market</h1></center>
          <form>
            <div className="form-group">
              <label htmlFor="cropName">Crop Name</label>
              <input
                type="text"
                id="cropName"
                name="cropName"
                value={formData.cropName}
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
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter Amount"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pricePerKg">Expected Selling Price per Kg</label>
              <input
                type="number"
                id="pricePerKg"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleInputChange}
                placeholder="Enter Price per Kg"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating for Quality of Crop</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
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
              <label htmlFor="totalAmount">Total Amount</label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleInputChange}
                placeholder="Enter Total Amount"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="photos">Add Photos</label>
              <input
                type="file"
                id="photos"
                name="photos"
                multiple
                onChange={handlePhotoUpload}
                className="file-input"
                required
              />
            </div>

            <button type="submit" className="submit-btn">Add Item</button>
          </form>
        </div>

        <div className="photo-section">
          <h3>Uploaded Photos</h3>
          {photos.length > 0 ? (
            <div className="photo-slider">
              {photos.map((photo, index) => (
                <div key={index} className="photo-slide">
                  <img src={photo} alt={`Crop ${index + 1}`} />
                  <button
                    className="remove-btn"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No photos uploaded yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToMarketForm;
