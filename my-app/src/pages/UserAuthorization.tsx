import React, {useState} from 'react';
import Input from "../utils/Input";
import {toast} from "react-toastify";
import Button from "../utils/Button";
// import {useAuth0} from '@auth0/auth0-react';
import {validUserAuthorization} from "../utils/authorizaton";
import {store} from "../store/store";
import {authTrue} from "../store/userActionCreators";
// import {checkAuthThunk} from "../store/reduxThunk";

interface User {
    user_email: string;
    user_password: string;
}

const UserAuthorization: React.FC = () => {
    // const {loginWithPopup, getAccessTokenSilently} = useAuth0()
    const [user, setUser] = useState<User>({
            user_email: '',
            user_password: '',
        }
    )

    // const setTokenAuth = async () => {
    //     const accessToken = await getAccessTokenSilently();
    //     localStorage.setItem('accessToken', accessToken);
    // }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUser({...user, [event.target.name]: value});
    }

    const authorisationFields = [
        {
            label: 'Email',
            name: 'user_email',
            id: '0',
            value: user.user_email,
            fun: handleInputChange,
            type: 'email'
        },
        {
            label: 'Password',
            name: 'user_password',
            id: '1',
            value: user.user_password,
            fun: handleInputChange,
            type: 'password',
        }]


    const fields = authorisationFields.map((item) => (
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

    const logIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (! await validUserAuthorization(user)){
            toast.error('Authorisation failed!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return
        }

        toast.success('Welcome!', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        store.dispatch(authTrue())
    };

    // const logInAuth = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     await loginWithPopup();
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
            <h2>Log in</h2>
            <form>
                {fields}
                <Button onClick={logIn}>Submit</Button>
                {/*<Button onClick={logInAuth}>Log In with auth</Button>*/}
            </form>
        </div>
    );
};

export default UserAuthorization;