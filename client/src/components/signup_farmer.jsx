import { useState } from 'react';
import './signup_farmer.css'

const SignupFarmer = () => {
    const [Fname, setFname] = useState("");
    const [Fpassword, setFpassword] = useState("");

    const handleNameChange = (e) => {
        const Farmername = e.target.value;
        setFname(Farmername);
    };
    const handlePasswordChange = (e) => {
        const Farmerpass = e.target.value;
        setFpassword(Farmerpass);
    };


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (Fname.trim() === "") {
            alert("Please enter your name."); // Basic validation
        } else {
            // Handle the submission logic here, e.g., send data to a server
            console.log(`Farmer Name: ${Fname}`);
            // Optionally, reset the form
            setFname("");
        }
    };

    return (

            <form id='signupform' onSubmit={handleSubmit}>
            <center><h1>Farmer Sign Up</h1></center>
                <div className="Fname">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={Fname} 
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="Fpassword">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="Fpassword" 
                        id="Fpassword" 
                        autoComplete="current-password"
                        value={Fpassword} 
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" id='accc'>Create Account</button> {/* Add a submit button */}
            </form>
    );
};

export default SignupFarmer;
