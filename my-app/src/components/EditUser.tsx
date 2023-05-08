import React, {useState} from 'react';
import Button from "../utils/Button";
import Input from "../utils/Input";
import {CurrentUserState} from "../store/reducers/currentUserReducer";
import {useLocation, useNavigate} from "react-router-dom";
import {deleteUser, updateUserInfo, updateUserPassword} from "../store/actions";
import {getTokenFromLocalStorage} from "../utils/authorizaton";
import {useAuth0} from "@auth0/auth0-react";
import './EditUser.css'

const EditUser = () => {
    const token = getTokenFromLocalStorage()
    const location = useLocation();
    const user = location.state
    const [updateUser, setUpdateUser] = useState<CurrentUserState>({
        user_id: user.user_id,
        user_email: user.user_email,
        user_firstname: user.user_firstname,
        user_lastname: user.user_lastname,
        user_avatar: user.user_avatar,
        user_status: user.user_status,
        user_city: user.user_city,
        user_phone: user.user_phone,
        user_links: user.user_links
    })

    const [updatePassword, setUpdatePassword] = useState({
        user_password: '',
        user_password_repeat: ''
    })

    const {logout} = useAuth0()
    const navigate = useNavigate()

    const handleLinkInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let updatedLinks: string[]
        if (user.user_links === null) {
            updatedLinks = []
        } else {
            updatedLinks = [...user.user_links];
        }
        updatedLinks.push(value)
        await setUpdateUser({...updateUser, user_links: updatedLinks});
    }

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        await setUpdateUser({...updateUser, [event.target.name]: value});
    };

    const handlePasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        await setUpdatePassword({...updatePassword, [event.target.name]: value});
    }

    const saveChanges = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await updateUserInfo(token, user.user_id, updateUser)
        navigate('/userProfile')
    }

    const updateUserPasswordOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await updateUserPassword(token, user.user_id, updatePassword.user_password, updatePassword.user_password_repeat)
    }

    const deleteUserById = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await deleteUser(token, user.user_id)
        logout()
        localStorage.removeItem('accessToken');
    }

    const editingFields = [
        {
            name: 'user_firstname',
            id: '0',
            value: 'user firstname',
            fun: handleInputChange,
            type: 'text'
        },
        {
            name: 'user_lastname',
            id: '1',
            value: 'user lastname',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_status',
            id: '2',
            value: 'user status',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_city',
            id: '3',
            value: 'user city',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_phone',
            id: '4',
            value: 'user phone',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_links',
            id: '5',
            value: 'user links',
            fun: handleLinkInput,
            type: 'text',
        }
    ];

    const passwordFields =[
        {
            name: 'user_password',
            id: '6',
            value: 'user password',
            fun: handlePasswordChange,
            type: 'password',
        },
        {
            name: 'user_password_repeat',
            id: '7',
            value: 'user password repeat',
            fun: handlePasswordChange,
            type: 'password',
        }
    ]

    const fields = editingFields.map((item) => (
        <Input
            name={item.name}
            key={item.id}
            label={item.value}
            value={item.value}
            onChange={item.fun}
            id={item.id}
            type={item.type}
        />
    ));

    const passwdFields = passwordFields.map((item) => (
        <Input
            name={item.name}
            key={item.id}
            label={item.value}
            value={item.value}
            onChange={item.fun}
            id={item.id}
            type={item.type}
        />))

    return (
        <form className='edit-form'>
            <div className="section_update_user_info">
                <h2>Edit Info</h2>
                {fields}
                <Button onClick={saveChanges}>Save Changes</Button>
            </div>

            <div className="section_update_user_password">
                <h2>Change Password</h2>
                {passwdFields}
                <div className="section_update_user_password-buttons">
                    <Button onClick={updateUserPasswordOnClick}>Update Password</Button>
                    <Button className="delete-button" onClick={deleteUserById}>Delete user</Button>
                </div>

            </div>


        </form>
    );
};

export default EditUser;