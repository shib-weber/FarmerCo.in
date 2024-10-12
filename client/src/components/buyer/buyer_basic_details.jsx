/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import './buyer_basic_form.css'
import {useNavigate} from 'react-router-dom'

const buyer_basic_details = () => {
    const navigate= useNavigate()
    const initial={
        state:'',
        address:'',
        pin:'',
        phone:0,
        yto:0,
        mjc:'',
        credentials:false
    }
    const [formdata, setformdata] = useState(initial);
    const handleChange =(e)=>{
        const { name, value } = e.target; // Get the input name and value
        setformdata({
          ...formdata, // Keep previous form data
          [name]: value // Update the current field
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const updatedFormData = { ...formdata, credentials: true };
        const response = await fetch(`http://localhost:4000/api/buyer/basicdetails`,{
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body:JSON.stringify({ updatedFormData }),
        })
        if (response.ok) {
            const data = await response.json();
            console.log('Update successful:', data);
            navigate('/buyer/profile')
            setTimeout(() => {
                navigate('/buyer_home'); // After 3 seconds, redirect to home
            }, 3000);
            
        } else {
            const errorData = await response.json();
            console.error('Error updating:', errorData);
        }
    }

  return (
    <>
    <div className="formdiv2" onSubmit={handleSubmit}>
        <center><h1>Other Basic Details</h1></center><br></br>
        <form action="" id="basic_details">
            <div className="location">
                <div className="state">
                    <label htmlFor="state">State</label>
                    <input type="text" name='state' onChange={handleChange} required/>
                </div>
                <div className="address">
                    <label htmlFor="address">Address</label>
                    <input type="text" name='address' onChange={handleChange} required />
                </div>
                <div className="pin">
                    <label htmlFor="pin">Pin </label>
                    <input type="text" name='pin' onChange={handleChange} required/>
                </div>
            </div>
            <div className="contactd">
                <div className="phone">
                    <label htmlFor="phone">Contact Number</label>
                    <input type="number" name='phone' onChange={handleChange} required />
                </div>
                <div className="idp">
                    <label htmlFor="yto">License Number</label>
                    <input type="number" name="yto" onChange={handleChange} required />
                </div>
                <div className="mjc">
                    <label htmlFor="mjc">Major Crop In Demand</label>
                    <input type="text" name='mjc' onChange={handleChange} required />
                </div>
            </div>
            <div className="terms">
                <input type="checkbox" required  />
                <label htmlFor="terms"id='term'>Terms And Conditions</label>
            </div>
            <button id='Save' type='submit'>Save</button>
        </form>
    </div>

    </>
  )
}

export default buyer_basic_details
