import {toast} from "react-toastify";
import {NewUser} from "../pages/UserRegistration";

export const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export const formValidation = (newUser: NewUser) => {
    if (isEmailValid(newUser.user_email)) {
        if (newUser.user_password && newUser.user_password === newUser.user_password_repeat) {
            return true
        } else {
            toast.error('Invalid password', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    } else {
        toast.error('Invalid email', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }
}

