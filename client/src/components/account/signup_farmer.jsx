import { useState } from 'react';
import './signup_farmer.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupFarmer = () => {
    const [Fname, setFname] = useState("");
    const [Fpassword, setFpassword] = useState("");

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

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
        notifySuccess('Sign Up successful')
        setFname("");
        notifyError('Test')
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
                <button type="submit" id='accc'>Create Account</button>
            </form>
    );
};

export default SignupFarmer;
