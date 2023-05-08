import React, {useState} from 'react';
import {CurrentUserState} from "../store/reducers/currentUserReducer";
import {store} from "../store/store";
import {changeUserAvatar} from "../store/actions";
import {getTokenFromLocalStorage} from "../utils/authorizaton";
import Button from "../utils/Button";
import '../utils/Input.css'
import {useNavigate} from "react-router-dom";
import './UserContainer.css'

interface UserProps {
    user: CurrentUserState;
}

const UserContainer = ({user}: UserProps) => {
    let isOwner = user.user_id === store.getState().currentUser.user_id;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const token = getTokenFromLocalStorage()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFile) {
            await changeUserAvatar(token, user.user_id, selectedFile)
        }
        window.location.reload();
    };

    const goToEditUser = () => {
        navigate('/editUser', {state: user})
    }


    return (
        <>
            {isOwner
                ?
                <div className="user-profile-container">
                    <div className="user-profile-image-container">
                        <img src={user.user_avatar} alt="user avatar"/>
                        <form onSubmit={handleFormSubmit}>
                            <input type="file" onChange={handleFileChange}/>
                            <Button type="submit">Upload</Button>
                        </form>
                    </div>
                    <div className="user-profile-info-container">
                        <h2>{user.user_firstname} {user.user_lastname}</h2>
                        <p>Email: {user.user_email}</p>
                        <p>Status: {user.user_status}</p>
                        <p>Location: {user.user_city}</p>
                        <p>Contacts: {user.user_phone}</p>
                        {(user.user_links !== null) &&
                        <div><p>Links:</p> {user.user_links.map(item => <p key={Math.random()}>{item}</p>)}</div>
                        }
                        <Button onClick={goToEditUser}>Edit Info</Button>
                    </div>

                </div>
                :
                <div className="user-profile-container">
                    <img src={user.user_avatar} alt="user avatar"/>
                    <div>
                        <h2>{user.user_firstname} {user.user_lastname}</h2>
                        <p>Email: {user.user_email}</p>
                        <p>Status: {user.user_status}</p>
                        <p>Location: {user.user_city}</p>
                        <p>Contacts: {user.user_phone}</p>
                        {(user.user_links !== null) &&
                        <div><p>Links:</p > {user.user_links.map(item => <p key={Math.random()}>{item}</p>)}</div>
                        }

                    </div>
                </div>
            }
        </>


    );
};

export default UserContainer;