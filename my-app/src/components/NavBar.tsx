import React from 'react';
import './NavBar.css'
import Button from "../utils/Button";
import {Link} from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';
import {RootState, store} from "../store/store";
import {useSelector} from "react-redux";
import {authFalse} from "../store/userActionCreators";

const NavBar: React.FC = () => {
    const{logout} = useAuth0()
    const isAuthenticated = useSelector((state: RootState) => state.isAuthorised.isAuthorised);
    const { user_email, user_firstname } = useSelector((state: RootState) => state.currentUser);
    const LogOut = async () => {
        logout()
        localStorage.removeItem('accessToken');
        store.dispatch(authFalse())
    }

    return (
        <nav className="nav">
            <Link to="/meduzzen-demo" className="nav-title">INK</Link>
            <ul>
                <li><Link to="/about"> About</Link></li>
                <li><Link to="/userList">User List</Link></li>
                <li><Link to="/companyList">Company List</Link></li>
            </ul>
            {isAuthenticated
                ?
                <>
                    <Link to='/userProfile'>
                        <Button>Email: {user_email}<br/>
                            name: {user_firstname}</Button>
                    </Link>
                    <Button onClick={() => LogOut()}>Log out</Button>
                </>

                : <div>
                    <Link to='/userRegistration'>
                        <Button>Sign up</Button>
                    </Link>

                    <Link to='/userAuthorization'>
                        <Button>Log in </Button>
                    </Link>
                </div>
            }
        </nav>
    );
};

export default NavBar;