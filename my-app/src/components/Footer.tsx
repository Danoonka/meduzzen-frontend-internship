import React from 'react';
import './Footer.css'
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fillOpacity="1" d="M0,320L60,293.3C120,267,240,213,360,181.3C480,149,600,139,720,154.7C840,171,960,213,1080,208C1200,203,1320,149,1380,122.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
            </svg>
            <div className='footer-container'>
                <div className="footer-navigation">
                    <h3><a href="/" className="footer-title">INK</a></h3>
                    <ul>
                        <li><Link to="/about"> About</Link></li>
                        <li><Link to="/userList">User List</Link></li>
                        <li><Link to="/companyList">Company List</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>Contact  Us</h3>
                    <ul>
                        <li><a href="#" className="contact-links">LinkedIn</a></li>
                        <li><a href="#" className="contact-links">GitHub</a></li>
                        <li><a href="#" className="contact-links">Telegram</a></li>
                    </ul>
                </div>
                <div className="footer-rights">
                    <p>All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;