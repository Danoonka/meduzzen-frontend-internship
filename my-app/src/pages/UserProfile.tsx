import React from 'react';
import './UserProfile.css'
import UserContainer from "../components/UserContainer";
import {store} from "../store/store";


const UserProfile: React.FC = () => {
    const {serverData: currentUserdata} = store.getState().currentUser
    return (
        <div>
            {currentUserdata && <UserContainer userData={currentUserdata}/>}
        </div>
    )

};

export default UserProfile;