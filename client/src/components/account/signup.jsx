import Navbar from './navbar'
import Swap from './swap'
import { ToastContainer } from 'react-toastify';
import Footer from './footer';

const signup = () => {
  return (
    <>
    <ToastContainer />
    <Navbar/>
    <Swap/>
    <Footer/>
    </>
  )
}

export default signup
