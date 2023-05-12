import React, {useEffect, useState} from 'react';
import {RootState} from "../store/store";
import Button from "../utils/Button";
import '../utils/Input.css'
import {useNavigate} from "react-router-dom";
import './UserContainer.css'
import {useSelector} from "react-redux";
import {CurrentUserState, initialCurrentUserState} from "../types";
import {changeUserAvatarThunk, getUserByIdThunk} from "../store/reduxThunk";

interface UserProps {
    user_id: number;
}

const UserContainer = ({user_id}: UserProps) => {
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const user = useSelector((state: RootState) => state.userById);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    getUserByIdThunk(user_id)


    const isOwner = user.user_id === currentUser.user_id


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFile) {
            await changeUserAvatarThunk(user.user_id, selectedFile)
        }
        window.location.reload();
    };

    const goToEditUser = () => {
        navigate('/editUser')
    }

    return (
        <div className="user-profile-container">
            <div className="user-profile-image-container">
                <img src={user.user_avatar} alt="user avatar"/>
                {isOwner &&
                <form onSubmit={handleFormSubmit}>
                    <input type="file" onChange={handleFileChange}/>
                    <Button type="submit">Upload</Button>
                </form>}
            </div>
            <div>
                <h2>{user.user_firstname} {user.user_lastname}</h2>
                <p>Email: {user.user_email}</p>
                <p>Status: {user.user_status}</p>
                <p>Location: {user.user_city}</p>
                <p>Contacts: {user.user_phone}</p>
                {(user.user_links !== null) &&
                <div><p>Links:</p> {user.user_links.map((item, idx) => <p key={idx}>{item}</p>)}</div>
                }
                {isOwner && <Button onClick={goToEditUser}>Edit Info</Button>}
            </div>
        </div>
    );
};

export default UserContainer;