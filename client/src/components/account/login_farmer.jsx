import { useState } from 'react';
import './signup_farmer.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginFarmer = () => {
    const navigate = useNavigate();
    const [Fname, setFname] = useState("");
    const [Fpassword, setFpassword] = useState("");

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent default form submission
        const response = await fetch('http://localhost:4000/api/farmer/login',{
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
        <form id="signupform" onSubmit={handleSubmit}>
            <center><h1>Farmer Login</h1></center>
            <div className="Fname">
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    value={Fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                />
            </div>
            <div className="Fpassword">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="Fpassword"
                    id="Fpassword"
                    value={Fpassword}
                    onChange={(e) => setFpassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" id="accc">Login</button>
        </form>
    );
};

export default LoginFarmer;
