import { useEffect, useState } from 'react';
import Navbar from "./navbar";
import './profile.css';

const Profile = () => {

  let initials = {    
    name: "John Doe",
    email:"",
    state: "California",
    address: "123 Main St",
    pin: 123456,
    contactNumber: 9876543210,
    LicenseNumber: 123456789012,
    majorCropDemand: "Wheat"
  };

  const [profileData, setProfileData] = useState(initials);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file); // file is the actual file object
      
        // Log FormData contents
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            const response = await fetch('http://localhost:4000/api/buyer/uploadPP', {
                method: 'POST',
                credentials: 'include', // To include the token for authentication
                body: formData
            });
            

            if (response.ok) {
                const result = await response.json();
                console.log('Profile picture uploaded:', result.url);
                setProfilePicture(result.url); // Update the state with the uploaded image URL
            } else {
                console.error('Error uploading profile picture');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};



  useEffect(() => {
    const fulldetails = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/buyer/fulldetails', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const result = await response.json();
          

          const updatedDetails = {
            name: result.name,
            email:result.email,
            state: result.state,
            address: result.address,
            pin: result.pin,
            phone: result.phone,
            yto: result.yto,
            mjc: result.mjc
          };

          setProfileData(updatedDetails);
          setProfilePicture(result.profilepic)
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

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/buyer/basicdetails', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ updatedFormData: profileData }), // Send the updated profile data
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert('Profile data saved successfully!');
        setEditField(null); // Exit edit mode
      } else {
        const errorData = await response.json();
        console.error('Error updating:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
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
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="upload-btn" />

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
