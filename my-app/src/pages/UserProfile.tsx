import React from 'react';
import './UserProfile.css'
import {RootState} from "../store/store";
import {useLocation} from "react-router-dom";
import UserContainer from "../components/UserContainer";
import {useSelector} from "react-redux";

const UserProfile: React.FC = () => {
    const { user_id: stateUserId } = useLocation().state || {};
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const userId = stateUserId || currentUser.user_id;

    return (
        <div>
            <UserContainer user_id={userId}/>
        </div>
    )

};

export default UserProfile;