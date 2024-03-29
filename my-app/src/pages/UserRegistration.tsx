import React, {useState} from 'react';
import Input from '../utils/Input';
import './UserRegistration.css';
import Button from '../utils/Button';
import {toast} from "react-toastify";
// import {useAuth0} from '@auth0/auth0-react';
import {validUserRegistration} from "../utils/authorizaton";
import {store} from "../store/store";
import {authTrue} from "../store/userActionCreators";
// import {checkAuthThunk} from "../store/reduxThunk";

export interface NewUser {
    user_password: string,
    user_password_repeat: string,
    user_email: string,
    user_firstname: string,
    user_lastname: string
}

const UserRegistration: React.FC = () => {
    // const {loginWithPopup, getAccessTokenSilently} = useAuth0()
    const [newUser, setNewUser] = useState<NewUser>({
        user_password: '',
        user_password_repeat: '',
        user_email: '',
        user_firstname: '',
        user_lastname: ''

    })

    // const setTokenAuth = async () => {
    //     const accessToken = await getAccessTokenSilently();
    //     localStorage.setItem('accessToken', accessToken);
    // }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewUser({...newUser, [event.target.name]: value});
    }


    const registrationFields = [
        {
            label: 'Email',
            name: 'user_email',
            id: '0',
            value: newUser.user_email,
            fun: handleInputChange,
            type: 'email'
        },
        {
            label: 'Password',
            name: 'user_password',
            id: '1',
            value: newUser.user_password,
            fun: handleInputChange,
            type: 'password',
        },
        {
            label: 'Repeat password',
            name: 'user_password_repeat',
            id: '2',
            value: newUser.user_password_repeat,
            fun: handleInputChange,
            type: 'password',
        },
        {
            label: 'Firstname',
            name: 'user_firstname',
            id: '3',
            value: newUser.user_firstname,
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'Lastname',
            name: 'user_lastname',
            id: '4',
            value: newUser.user_lastname,
            fun: handleInputChange,
            type: 'text',
        },
    ];

    const fields = registrationFields.map((item) => (
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


    const register = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!await validUserRegistration(newUser)) {
            toast.error('Registration failed!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return
        }
        toast.success('Registration done', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        store.dispatch(authTrue())
    }

    // const logInAuth0 = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     await loginWithPopup({authorizationParams: {screen_hint: 'signup'}});
    //     await setTokenAuth();
    //     if (await checkAuthThunk()) {
    //         store.dispatch(authTrue())
    //         toast.success('Welcome!', {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         })
    //     }
    // }


    return (
        <div className="input-container">
            <h2>Create account</h2>
            <form>
                {fields}
                <Button onClick={register}>Submit</Button>
                {/*<Button onClick={logInAuth0}>Log In with auth</Button>*/}
            </form>
        </div>
    );
};

export default UserRegistration;
