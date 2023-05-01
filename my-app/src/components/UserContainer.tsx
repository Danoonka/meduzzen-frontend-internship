import React from 'react';

interface UserData {
    user_avatar: string;
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_status: string;
    user_city: string;
    user_phone: string;
}

interface UserContainerProps {
    userData: UserData;
}


const UserContainer: React.FC<UserContainerProps> = ({userData}) => {
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