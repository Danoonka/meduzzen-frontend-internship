import React from 'react';


interface UserContainerProps {
    userData: {
        "user_id": 0,
        "user_email": string,
        "user_firstname": string,
        "user_lastname": string,
        "user_avatar": string,
        "user_status": string,
        "user_city": string,
        "user_phone": string,
        "user_links": [
            string
        ],
    }
}


const UserContainer: React.FC<UserContainerProps> = ({userData}:UserContainerProps) => {
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