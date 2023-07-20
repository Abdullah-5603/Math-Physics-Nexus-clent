import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { FaUser } from 'react-icons/fa'
import axios from 'axios';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        if (user) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/current-user/${user?.email}`)
                .then(res => {
                    setCurrentUser(res.data)
                    // console.log(res.data)
                })
        }
    }, [user])

    const handleSignOut = () => {
        signOutUser()
            .then(() => { })
            .cath((err) => {
                console.log(err.message)
            })
    }

    return (
        <div className="navbar bg-base-300 md:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 font-semibold shadow-2xl bg-base-300 rounded-box">
                        <li><Link to='/'>Home</Link></li>
                        {currentUser.role === 'admin' && <li><Link to="/upload-papers">Upload Papers</Link></li>}
                        {currentUser.role === 'student' && <li><Link to="/my-papers">My Papers</Link></li>}
                        {user && (
                            <div className="flex items-center">
                                <li><Link onClick={handleSignOut}>Sign Out</Link></li>
                                {currentUser?.image ? (
                                    <img className='w-5 h-5 rounded-full' src={currentUser?.image} alt="" />
                                ) : (
                                    <FaUser className="w-5 h-5" />
                                )}
                            </div>
                        )}
                        {!user && <li><Link to="/log-in">Login</Link></li>}
                    </ul>
                </div>
                <Link to='/' className="md:text-2xl text-lg md:font-bold font-semibold">Math Physics Nexus</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    <li><Link to='/'>Home</Link></li>
                    {currentUser.role === 'admin' && <li><Link to="/upload-papers">Upload Papers</Link></li>}
                    {currentUser.role === 'student' && <li><Link to="/my-papers">My Papers</Link></li>}
                    {user && (
                        <div className="flex items-center">
                            <li><Link onClick={handleSignOut}>Sign Out</Link></li>
                            {currentUser?.image ? (
                                <img className='w-5 h-5 rounded-full' src={currentUser?.image} alt="" />
                            ) : (
                                <FaUser className="w-5 h-5" />
                            )}
                        </div>
                    )}
                    {!user && <li><Link to="/log-in">Login</Link></li>}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;