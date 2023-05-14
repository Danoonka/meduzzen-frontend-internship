import React from 'react';
import {Link} from "react-router-dom";
import {CurrentUserProps} from "../types";
import userAvatar from "../assets/ffa09aec412db3f54deadf1b3781de2a.png";


const UserItem = ({currentUser}: CurrentUserProps) => {
    return (
        <Link to='/userProfile' state={{user_id: currentUser.user_id}}>
            <div className="user-item-container">
                <img src={currentUser.user_avatar === null ? userAvatar : currentUser.user_avatar} alt="user avatar"/>
                <div>
                    <h4>{currentUser.user_firstname} {currentUser.user_lastname}</h4>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;