import React, {ReactNode} from 'react';
import {ActionUserState, CurrentUserState} from "../../types";
import './UserRows.css'
import userAvatar from '../../assets/ffa09aec412db3f54deadf1b3781de2a.png'

interface CurrentUserProps {
    currentUser: ActionUserState | CurrentUserState;
    children: ReactNode;
}

const UserRows = ({currentUser, children}: CurrentUserProps) => {
    return (
        <div className="user-row-container">
            <img className="user-row-container-img"
                 src={currentUser.user_avatar === null ? userAvatar : currentUser.user_avatar} alt="user avatar"/>
            <div>
                <h4 className='user-row-container-heading'>{currentUser.user_firstname} {currentUser.user_lastname}</h4>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default UserRows;