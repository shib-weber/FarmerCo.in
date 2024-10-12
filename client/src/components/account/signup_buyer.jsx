import { useState } from 'react';
import './signup_buyer.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const SignupBuyer = () => {

    const navigate= useNavigate()
    const [Bname, setBname] = useState("");
    const [Bpassword, setBpassword] = useState("");
    const [Bemail, setBemail] = useState("");

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleNameChange = (e) => {
        const Buyername = e.target.value;
        setBname(Buyername);
    };
    const handlePasswordChange = (e) => {
        const Buyerpass = e.target.value;
        setBpassword(Buyerpass);
    };
    const handleEmailChange = (e) => {
        const Buyeremail = e.target.value;
        setBemail(Buyeremail);
    };


    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent default form submission
        const response = await fetch('http://localhost:4000/api/buyer/signup',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body:JSON.stringify({ Bname ,Bemail,Bpassword }),
        })
        const result = await response.json();
        if (result.message === 'Incorrect Name or Password') {
            notifyError(result.message);
        } else {
            notifySuccess(result.message);
            setTimeout(() => {
                navigate('/buyer_home'); // After 3 seconds, redirect to home
            }, 3000);
        }
        setBname("");
        setBpassword("")
        setBemail("")
    };

    return (

            <form id='signupform' onSubmit={handleSubmit}>
            <center><h1>Buyer Sign Up</h1></center>
                <div className="Bname">
                    <label htmlFor="name">Company Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={Bname} 
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="Bemail">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={Bemail} 
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="Bpassword">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="Bpassword" 
                        id="Bpassword" 
                        autoComplete="current-password"
                        value={Bpassword} 
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" id='accc'>Create Account</button>

            </form>
    );
};

export default SignupBuyer;
