import Navbar from './navbar'
import { useEffect } from 'react';
import Swap from './swap_l'
import Footer from './footer';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    // Check if the user is authenticated by calling the backend /istoken
    const checkAuth = async () => {
      const response = await fetch('http://localhost:4000/api/buyer/istoken', 
        {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent along with the request
      });
      const data = await response.json();
      console.log(data)
      if (data === 'Yes') {
        navigate('/buyer_home')
      } 
      else{
        const response = await fetch('http://localhost:4000/api/farmer/istoken', 
          {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent along with the request
        });
        const data = await response.json();
        console.log(data)
        if (data === 'Yes') {
          navigate('/farmer_home')
        } 
      }
    };

    checkAuth();
  }, []);
  return (
    <>
    <ToastContainer />
    <Navbar/>
    <Swap/>
    <Footer/>
    </>
  )
}

export default login
