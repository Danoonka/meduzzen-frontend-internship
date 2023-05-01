import React from 'react';
import {Link} from "react-router-dom";

interface UserData {
    id: number;
    user_avatar: string;
    user_firstname: string;
    user_lastname: string;
    user_status: string;
    user_city: string;
}

interface UserItemProps {
    userData: UserData;
}

const UserItem : React.FC<UserItemProps>= ({userData}) => {

    return (
        <Link to='/userProfile' state={{data: userData.id}}>
            <div className="user-item-container">
                <img src={userData.user_avatar} alt="user avatar"/>
                <div>
                    <h4>{userData.user_firstname} {userData.user_lastname}</h4>
                    <p>Status: {userData.user_status}</p>
                    <p>Location: {userData.user_city}</p>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;