import { useState } from 'react';
import './signup_buyer.css'

const LoginBuyer = () => {
    const [Bname, setBname] = useState("");
    const [Bpassword, setBpassword] = useState("");

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
        setBname("");
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
