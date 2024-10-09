import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFarmer from './login_farmer'; 
import LoginBuyer from './login_buyer'; 
import './swap.css';

const SwapL = () => {
    const [isBuyer, setIsBuyer] = useState(true); // State to determine the current form
    const navigate = useNavigate(); 

    const handleLoginClick = ()=>{
        navigate('/');
    }

    const handleSwitchClick = () => {
        setIsBuyer(prev => !prev); // Toggle the state
        const sign_c = document.querySelector('.sign_container');
        const info = document.querySelector('.info');
        if (info.innerHTML === 'Are You A Buyer ?') {
            sign_c.classList.add('switch_div'); // Ensure you have styles for this class
            info.innerHTML = "Are You A Farmer ?";
        } else {
            sign_c.classList.remove('switch_div'); // Ensure you have styles for this class
            info.innerHTML = "Are You A Buyer ?";
        }
    };

    return (
        <div className="sign_container">
            <div className="clear_circle">
                <div className="info">{isBuyer ? "Are You A Buyer ?" : "Are You A Farmer ?"}</div>
                <button id='switch' onClick={handleSwitchClick}>Switch</button>
            </div>
            <div className="whole">
            <div className="formdiv">
                {isBuyer ? (
                    // Display the buyer's form here (you can create a component for buyers)
                    <LoginFarmer />

                ) : (
                    <LoginBuyer/>
                )}
            </div>
            <div className="for_login">
                    <p>Don`t have an Account ?</p>
                    <button id='for_L' onClick={handleLoginClick}>Sign Up</button>
            </div>
            </div>

        </div>
    );
};

export default SwapL;
