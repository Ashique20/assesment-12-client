import { useContext } from 'react';
import logo from '../Navbar/logo/logo.png';
import { AuthContext } from '../AuthContext/AuthProvider';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const {user} = useContext(AuthContext)
    const {logOut} = useContext(AuthContext)
    const handleLogOut=()=>{
        logOut()
        .then(result=>console.log(result))
    }
    return (
        <div className="navbar bg-red-600 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                 
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div>
                    <Link to='/'>              
                          <img className='w-24' src={logo} alt="Logo" />
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                    <li><NavLink to='/donationRequests'>All Donation Requests</NavLink></li>
                    <li><NavLink to='/funds'>Fund</NavLink></li>
                    <li><NavLink to='/chat'>Chat with everyone</NavLink></li>
                 
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email?<a onClick={handleLogOut} className="btn">Log Out</a>:<Link to='/logIn' className="btn">Sign In</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
