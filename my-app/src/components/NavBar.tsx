import React, {useState} from 'react';
import './NavBar.css'
import Button from "../utils/Button";
import {Link} from "react-router-dom";
import aboutPageCompanyImg from "../assets/about-page-company-img.png";

let user = {id: 4,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"}

const NavBar = () => {
    const [isAuth, setIsAuth] = useState(false)
    return (
        <nav className="nav">
            <a href="/" className="nav-title">INK</a>
            <ul>
                <li><Link  to="/about"> About</Link></li>
                <li><Link to="/userList">User List</Link></li>
                <li><Link to="/companyList">Company List</Link></li>
            </ul>
            {!isAuth &&
            <div>
                <Link to='/userRegistration'>
                    <Button>Sign up</Button>
                </Link>

                <Link to='/userAuthorization'>
                    <Button>Login in </Button>
                </Link>
            </div> }
            {isAuth &&
            <Link to='/userProfile' state={{data: user}}>
                <Button>User Name</Button>
            </Link>
            }
        </nav>
    );
};

export default NavBar;