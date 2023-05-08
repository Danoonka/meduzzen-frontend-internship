import React, {useEffect, useState} from 'react';
import './UserProfile.css'
import {RootState, store} from "../store/store";
import {useLocation} from "react-router-dom";
import {getUserById} from "../store/actions";
import {getTokenFromLocalStorage} from "../utils/authorizaton";
import {useSelector} from "react-redux";
import {CurrentUserState, initialCurrentUserState} from "../store/reducers/currentUserReducer";
import UserContainer from "../components/UserContainer";

const UserProfile: React.FC = () => {

    const token = getTokenFromLocalStorage();
    const location = useLocation();
    let userId = location.state?.user_id || store.getState().currentUser.user_id;


    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<CurrentUserState>(store.getState().currentUser);

    useEffect(() => {
        getUserById(token, userId).then(response => {
            setUserData(response);
            setIsLoading(false);
        })
    }, [token, userId]);

    return (
        <div>
            {(isLoading && !userData) ? (
                <div>Loading...</div>
            ) : (

                <UserContainer user={userData}/>
            )}
        </div>
    )

};

export default UserProfile;