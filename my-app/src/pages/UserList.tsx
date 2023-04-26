import React from 'react';
import aboutPageCompanyImg from '../assets/about-page-company-img.png'
import {Link} from "react-router-dom";

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
                <div>
                    <img src={item.user_avatar} alt="user avatar"/>
                    <div>
                        <h4>{item.user_firstname} {item.user_lastname}</h4>
                        <p>{item.user_status}</p>
                        <p>{item.user_city}</p>
                    </div>
                </div>
            </Link>
            )


    return (
        <div className="container">
            {users}
        </div>
    );
};

export default UserList;