import React from 'react';
import {Link} from "react-router-dom";
import {CurrentUserState} from "../types";

interface CurrentUserProps {
    currentUser: CurrentUserState;
}

const UserItem: React.FC<CurrentUserProps> = ({currentUser}: CurrentUserProps) => {
    return (
        <Link to='/userProfile' state={{user_id: currentUser.user_id}}>
            <div className="user-item-container">
                <img src={currentUser.user_avatar} alt="user avatar"/>
                <div>
                    <h4>{currentUser.user_firstname} {currentUser.user_lastname}</h4>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;