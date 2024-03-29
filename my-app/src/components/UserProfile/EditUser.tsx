import React, {useState} from 'react';
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import './EditUser.css'
import {toast} from "react-toastify";
import {CurrentUserState} from "../../types";
import {deleteUserThunk, updateUserInfoThunk, updateUserPasswordThunk} from "../../store/reduxThunk";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CheckModal from "../modalWindows/CheckModal";

const EditUser = () => {
    const user = useSelector((state: RootState) => state.currentUser);
    const [isOpen, setIsOpen] = useState(false);

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
        if (updateUser.user_links === null) {
            updatedLinks = []
        } else {
            updatedLinks = [...updateUser.user_links];
            updatedLinks = (value.split(','))
        }
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
        await updateUserInfoThunk(user.user_id, updateUser)
        navigate(`/userProfile/${user.user_id}`)
        toast.success("User info updated", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const updateUserPasswordOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/userProfile/${user.user_id}`)
        await updateUserPasswordThunk(user.user_id, updatePassword.user_password, updatePassword.user_password_repeat)
        toast.success("Password updated!", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const onClickDeleteUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setIsOpen(!isOpen);
    }

    const deleteUserById = async () => {
        await deleteUserThunk(user.user_id)
        logout()
        localStorage.removeItem('accessToken');
    }

    const editingFields = [
        {
            label: 'Firstname',
            name: 'user_firstname',
            id: '0',
            value: updateUser.user_firstname,
            fun: handleInputChange,
            type: 'text'
        },
        {
            label: 'Lastname',
            name: 'user_lastname',
            id: '1',
            value: updateUser.user_lastname,
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'Status',
            name: 'user_status',
            id: '2',
            value: (updateUser.user_status ? updateUser.user_status : ''),
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'City',
            name: 'user_city',
            id: '3',
            value: (updateUser.user_city ? updateUser.user_city : ''),
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'Phone',
            name: 'user_phone',
            id: '4',
            value: (updateUser.user_phone ? updateUser.user_phone : ''),
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'Links',
            name: 'user_links',
            id: '5',
            value: (updateUser.user_links ? updateUser.user_links : ''),
            fun: handleLinkInput,
            type: 'text',
        }
    ];

    const passwordFields = [
        {
            label: 'Password',
            name: 'user_password',
            id: '6',
            value: updatePassword.user_password,
            fun: handlePasswordChange,
            type: 'password',
        },
        {
            label: 'Repeat Password',
            name: 'user_password_repeat',
            id: '7',
            value: updatePassword.user_password_repeat,
            fun: handlePasswordChange,
            type: 'password',
        }
    ]

    const fields = editingFields.map((item) => (
        <Input
            name={item.name}
            key={item.id}
            label={item.label}
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
            label={item.label}
            value={item.value}
            onChange={item.fun}
            id={item.id}
            type={item.type}
        />))

    return (
        <>
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
                        <Button className="delete-button" onClick={onClickDeleteUser}>Delete user</Button>
                    </div>
                </div>
            </form>
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} callback={()=>deleteUserById()}/>
        </>

    );
};

export default EditUser;