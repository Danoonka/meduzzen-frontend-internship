import React from 'react';
import aboutPageCompanyImg from '../assets/about-page-company-img.png'
import {Link} from "react-router-dom";
import './UserList.css'

const UserList = () => {
    const userList = [
        {id: 0,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
        {id: 1,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
        {id: 2,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
        {id: 3,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
        {id: 4,  "user_email": "string", "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string", "user_phone": "string"},
    ]
    const users = userList.map((item) =>
            <Link to='/userProfile' key={item.id} state={{data: item}}>
                <div className="user-item-container">
                    <img src={item.user_avatar} alt="user avatar"/>
                    <div>
                        <h4>{item.user_firstname} {item.user_lastname}</h4>
                        <p>Status: {item.user_status}</p>
                        <p>Location: {item.user_city}</p>
                    </div>
                </div>
            </Link>
            )


    return (
        <div>
            <h3 className="user-list-heading">User List</h3>
            <div className="user-list-container">
                {users}
            </div>
        </div>

    );
};

export default UserList;