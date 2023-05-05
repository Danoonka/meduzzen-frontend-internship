import React from 'react';
import aboutPageCompanyImg from '../assets/about-page-company-img.png'
import './UserList.css'
import UserItem from "../components/UserItem";

const UserList = () => {
    const userList = [
        {id: 0, "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string"},
        {id: 1, "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string"},
        {id: 2, "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string"},
        {id: 3, "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string"},
        {id: 4, "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string"},
        {id: 5, "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string"},
        {id: 6, "user_firstname": "string", "user_lastname": "string", "user_avatar": aboutPageCompanyImg, "user_status": "string", "user_city": "string"},

    ]
    const users = userList.map((item) =>
            <UserItem userData ={item} key={item.id}/>
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