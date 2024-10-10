import { useNavigate } from "react-router-dom";
import "./navbar.css"

export default function Navbar(){
    const navigate= useNavigate()
    
    const handleHomeClick =()=>{
        navigate('/')
    }

    const handleLoginClick =()=>{
        navigate('/login')
    }

    const handleAboutClick =()=>{
        navigate('/about')
    }

    return(
        <div className="navbar bg-violet-900 h-20 fixed-navbar" >
            <div className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn btn-white drawer-button">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-15 w-15"
                                fill="white"
                                viewBox="0 0 24 24"
                                stroke="violet">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            </div>
                        </label>
                    </div>
                    <div className="drawer-side z-20">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content z-50 min-h-full w-80 p-4 shadow-violet-500" >
                            <li onClick={handleHomeClick}><a>Home</a></li>
                            <li onClick={handleHomeClick}><a>Sign Up</a></li>
                            <li onClick={handleLoginClick}><a>Login</a></li>
                            <li onClick={handleAboutClick}><a>About Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>



        </div>
    )
}