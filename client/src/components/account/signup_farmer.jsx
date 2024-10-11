import { useState, } from 'react';
import './signup_farmer.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignupFarmer = () => {
    const navigate = useNavigate()

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


    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent default form submission
        const response = await fetch('http://localhost:4000/api/farmer/signup',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body:JSON.stringify({ Fname ,Fpassword }),
        })
        const result = await response.json();
        if (result.message === 'Incorrect Name or Password') {
            notifyError(result.message);
        } else {
            notifySuccess(result.message);
            setTimeout(() => {
                navigate('/farmer_home'); // After 3 seconds, redirect to home
            }, 3000);
        }
        setFname("");
        setFpassword("")
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
