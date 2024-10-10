import Navbar from './navbar'
import Swap from './swap_l'
import Footer from './footer';
import { ToastContainer } from 'react-toastify';
const login = () => {
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
