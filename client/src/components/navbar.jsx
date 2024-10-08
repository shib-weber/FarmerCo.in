import { Link } from "react-router-dom";
import "./navbar.css"

export default function Navbar(){
    return(
        <nav className="position-fixed p-3 px-10 border flex items-center justify-center bg-blue-700 shadow-md shadow-blue-300">
            
            <div className="inter flex items-center list-none gap-6 nav-items">
                <Link to={""} className="text-xl text-white">Home</Link>
                <Link to={""} className="text-xl text-white">About</Link>
            </div>
        </nav>
    )
}