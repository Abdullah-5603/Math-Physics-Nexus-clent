import React from 'react';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer items-center mt-10 py-5 md:py-8 bg-neutral justify-around text-neutral-content">
            <div className="items-center grid-flow-col">
                <Link to='/' className="md:text-2xl text-xl md:font-bold font-semibold">Math Physics Nexus</Link>
            </div>
            <p className='flex items-center'>Copyright © 2023 - All right reserved by <span className='uppercase font-semibold'>Abu Abdullah</span></p>
            <div className='flex items-center space-x-4'>
                <a href='https://github.com/Abdullah-5603/' target='_blank'><FaGithub className='w-6 h-6' /></a>
                <a href='https://www.facebook.com/ABDULLAH01518' target='_blank'><FaFacebook className='w-6 h-6'/></a>
            </div>
        </footer>
    );
};

export default Footer;