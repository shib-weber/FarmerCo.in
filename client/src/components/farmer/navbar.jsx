import { useNavigate } from "react-router-dom";
import "./navbar.css"

export default function Navbar(){
    const navigate= useNavigate()
    
    const handleOfferItem =()=>{
        navigate('/farmer_home/offered_items')
    }

    const handleHomeClick =()=>{
        navigate('/farmer_home')
    }

    const handleMarketClick =()=>{
        navigate('/farmer_home/market_items')
    }

    const handleSoldClick =()=>{
        navigate('/farmer_home/sold_items')
    }

    const handleCompanyClick =()=>{
        navigate('/farmer_home/companies')
    }
    const handleFarmerForum =()=>{
        navigate('/farmer_home/farmers_forum')
    }
    const handleProfile =()=>{
        navigate('/farmer_home/profile')
    }
    const handleLogOut=async()=>{
        const response = await fetch('http://localhost:4000/api/farmer/logout',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        const result =await response.json()
        if (result === 'loggedOut'){
            navigate('/login')
        }
    }

    return(
        <div className="navbar bg-green-700 h-20 fixed-navbar" >
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
                                stroke="green">
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
                        <ul className="menu bg-base-200 text-base-content z-50 min-h-full w-80 p-4 shadow" >
                            <li onClick={handleHomeClick}><a>Home</a></li>
                            <li onClick={handleOfferItem}><a>Offered Items</a></li>
                            <li onClick={handleMarketClick}><a>Your Items In Market</a></li>
                            <li onClick={handleCompanyClick}><a>Companies</a></li>
                            <li onClick={handleSoldClick}><a>Sold History</a></li>
                            <li onClick={handleFarmerForum}><a>Farmer`s Forum</a></li>
                            <li><a>Contracts</a></li>
                        </ul>
                    </div>
                </div>
            </div>


        
        <div className="flex-none gap-2">
            <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li onClick={handleProfile}>
                <a className="justify-between">
                    Profile
                    <span className="badge bg-green-900 text-white">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogOut}><a>Logout</a></li>
            </ul>
            </div>
        </div>
        </div>
    )
}