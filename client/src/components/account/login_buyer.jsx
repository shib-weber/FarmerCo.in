import { useState } from 'react';
import './signup_buyer.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginBuyer = () => {
    const [Bname, setBname] = useState("");
    const [Bpassword, setBpassword] = useState("");

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


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        notifySuccess('Login successful')
        setBname("");
        notifyError('Test')
    };

    return (

            <form id='signupform' onSubmit={handleSubmit}>
            <center><h1>Buyer Login</h1></center>
                <div className="Bname">
                    <label htmlFor="name">Company Name Or Email</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={Bname} 
                        onChange={handleNameChange}
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
                <button type="submit" id='accc'>Login</button>

            </form>
    );
};

export default LoginBuyer;
