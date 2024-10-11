import { useEffect, useState } from 'react';
import Navbar from "./navbar";
import './profile.css';

const Profile = () => {

  let initials = {    
    name: "John Doe",
    state: "California",
    localPanchayat: "Local Panchayat",
    address: "123 Main St",
    pin: 123456,
    contactNumber: 9876543210,
    idProof: 123456789012,
    areaForCultivation: 10,
    majorCrop: "Wheat"
  };

  const [profileData, setProfileData] = useState(initials);

  useEffect(() => {
    const fulldetails = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/farmer/fulldetails', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(result);

          const updatedDetails = {
            name: result.name,
            state: result.state,
            localPanchayat: result.localP,
            address: result.address,
            pin: result.pin,
            contactNumber: result.phone,
            idProof: result.idp,
            areaForCultivation: result.land,
            majorCrop: result.mjc
          };

          setProfileData(updatedDetails);
        } else {
          console.error('Error fetching full details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fulldetails(); // Call the function here
  }, []);

  const [editField, setEditField] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleSaveClick = () => {
    setEditField(null);
    // Save profileData to the backend or local storage
    alert('Profile data saved!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-picture-section">
          {profilePicture ? (
            <>
              <img src={profilePicture} alt="Profile" className="profile-picture" />
              <button onClick={handleRemoveProfilePicture} className="remove-picture-btn">Remove Picture</button>
            </>
          ) : (
            <div>
              <input type="file" onChange={handleProfilePictureChange} className="upload-btn" />
            </div>
          )}
        </div>

        <div className="profile-details">
          {Object.keys(profileData).map((key) => (
            <div className="profile-item" key={key}>
              <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</label>
              {editField === key ? (
                <input
                  type="text"
                  name={key}
                  value={profileData[key]}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <span>{profileData[key]}</span>
              )}
              {editField !== key && (
                <button className="edit-btn" onClick={() => handleEditClick(key)}>Edit</button>
              )}
            </div>
          ))}
        </div>

        {editField && (
          <div className="save-btn-container">
            <button onClick={handleSaveClick} className="save-btn">Save</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
