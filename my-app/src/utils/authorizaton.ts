import {toast} from "react-toastify";
import {NewUser} from "../pages/UserRegistration";
import {User} from "@auth0/auth0-react";
import {addUser, checkAuth, logInUser} from "../api/api";

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

export const validUserRegistration = async(newUser : NewUser)=>{
    if (!formValidation(newUser)) {
        return false
    }
    if (!await addUser(newUser)) {
        return false
    }
    if (!await logInUser(newUser.user_email, newUser.user_password)) {
        return false
    }
    if (!await checkAuth()) {
        return false
    }

    return true
}

export const validUserAuthorization = async (user: User) =>{
    if (!isEmailValid(user.user_email)) {
        toast.error('Email Invalid!')
        return false
    }
    if (!await logInUser(user.user_email, user.user_password)) {
        return false
    }
    if (!await checkAuth()) {
        return false
    }

    return true
}

