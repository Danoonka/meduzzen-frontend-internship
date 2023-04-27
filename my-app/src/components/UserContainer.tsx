import React from 'react';


const UserContainer = (userData:any) => {
    userData = userData.userData
    return (
        <div className="user-profile-container">
            <img src={userData.user_avatar} alt="user avatar"/>
            <div>
                <h2>{userData.user_firstname} {userData.user_lastname}</h2>
                <p>Email: {userData.user_email}</p>
                <p>Status: {userData.user_status}</p>
                <p>Location: {userData.user_city}</p>
                <p>Contacts: {userData.user_phone}</p>
            </div>
        </div>

    );
};

export default UserContainer;