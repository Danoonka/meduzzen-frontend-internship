import React from 'react';
import {useLocation} from "react-router-dom";

const UserProfile = () => {
    const location = useLocation()
    const {data} = location.state

    return (
        <div className="container">
            <img src={data.user_avatar} alt="user avatar"/>
            <h2>{data.user_firstname} {data.user_lastname}</h2>
            <p>{data.user_email}</p>
            <p>{data.user_status}</p>
            <p>{data.user_city}</p>
            <p>{data.user_phone}</p>
        </div>
    );
};

export default UserProfile;