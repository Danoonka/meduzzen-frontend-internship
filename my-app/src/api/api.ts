import axios from "axios";
import {store} from "../store/store";
import {
    changeUserAvatarAction,
    receiveAllUsersAction,
    receiveCurrentUserAction,
    updateUserInfoAction
} from "../store/userActionCreators";
import {NewUser} from "../pages/UserRegistration";
import {toast} from "react-toastify";
import {CurrentUserState} from "../store/reducers/currentUserReducer";

export const instance = axios.create({
        baseURL: 'http://3.75.186.163',
        timeout: 10000,
    }
);

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const checkAuth = async () => {
    return await instance
        .get('/auth/me/')
        .then(function (response) {
            store.dispatch(receiveCurrentUserAction(response.data.result))
            return true
        })
        .catch(function (error) {
            localStorage.removeItem('accessToken')
            return false
        });

}

export const addUser = async (user: NewUser) => {
    return await instance
        .post("/user/", {
            user_password: user.user_password,
            user_password_repeat: user.user_password_repeat,
            user_email: user.user_email,
            user_firstname: user.user_firstname,
            user_lastname: user.user_lastname
        })
        .then(function (response) {
            return true;
        })
        .catch(function (error) {
            toast.error("Invalid data!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        });
}

export const logInUser = async (email: string, password: string) => {
    return await instance
        .post('/auth/login/', {
            user_email: email,
            user_password: password
        })
        .then(function (response) {
            localStorage.setItem('accessToken', response.data.result.access_token);
            return true;
        })
        .catch(function (error) {
            toast.error("Invalid Email or Password!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        });
}


export const getUserById = async (id: number) => {
    return await instance
        .get(`/user/${id}/`)
        .then(function (response) {
            return response.data.result
        })
        .catch(function (error) {
            toast.error("Failed to get user by ID", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const changeUserAvatar = async (id: number, file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    return await instance
        .put(`/user/${id}/update_avatar/`, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
            }
        )
        .then(function (response) {
            store.dispatch(changeUserAvatarAction(response.data.result))
        })
        .catch(function (error) {
            toast.error("Failed to set user avatar", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateUserInfo = async (id: number, user: CurrentUserState) => {
    return await instance
        .put(`/user/${id}/update_info/`, user)
        .then(function (response) {
            store.dispatch(updateUserInfoAction(user))
        })
        .catch(function (error) {
            toast.error("Failed to update user info", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateUserPassword = async (id: number,
                                         user_password: string,
                                         user_password_repeat: string) => {
    return await instance
        .put(`/user/${id}/update_password/`,
            {
                "user_password": user_password,
                "user_password_repeat": user_password_repeat
            })
        .catch(function (error) {
            toast.error("Failed to update user password", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteUser = async (id: number) => {
    return await instance
        .delete(`/user/${id}/`)
        .catch(function (error) {
            toast.error("Failed to delete user", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const pagination = async (page: number, size: number) => {
    return await instance
        .get(`/users/?page=${page}&page_size=${size}`)
        .then(function (response) {
            store.dispatch(receiveAllUsersAction(response.data.result.users))
            return response.data.result.pagination
        })
        .catch(function (error) {
            toast.error("Failed to get user in this page", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}




