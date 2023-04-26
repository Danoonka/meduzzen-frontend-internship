import React from 'react';
import {useLocation} from "react-router-dom";
import './UserProfile.css'

const UserProfile = () => {
    const location = useLocation()
    const {data} = location.state

    return (
        <div className="user-profile-container">
            <img src={data.user_avatar} alt="user avatar"/>
            <div>
                <h2>{data.user_firstname} {data.user_lastname}</h2>
                <p>Email: {data.user_email}</p>
                <p>Status: {data.user_status}</p>
                <p>Location: {data.user_city}</p>
                <p>Contacts: {data.user_phone}</p>
            </div>
        </div>
    );
};

export default UserProfile;