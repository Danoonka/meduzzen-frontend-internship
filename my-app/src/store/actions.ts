import {store} from "./store";
import {instance} from "../api/api";
import {NewUser} from "../pages/UserRegistration";
import {toast} from "react-toastify";
import {CurrentUserState} from "./reducers/currentUserReducer";
import {AllUsersState} from "./reducers/allUsersReducer";

export type Action =
    | { type: "RECEIVE_CURRENT_USER", payload: CurrentUserState }
    | { type: "IS_AUTHORISED_TRUE" }
    | { type: "RECEIVE_ALL_USERS", payload: AllUsersState }
    | { type: "RECEIVE_USER_BY_ID", payload: CurrentUserState }
    | { type: 'TOTAL_USER_COUNT', payload: number }
    | { type: 'CHANGE_USER_AVATAR', payload: string }
    | { type: 'UPDATE_USER_INFO', payload: CurrentUserState}


// TODO: look
export interface ReceiveServerDataAction {
    type: 'RECEIVE_CURRENT_USER',
    payload: CurrentUserState
}

export interface ReceiveAllUsers {
    type: 'RECEIVE_ALL_USERS',
    payload: AllUsersState
}

export interface ReceiveUserById {
    type: "RECEIVE_USER_BY_ID",
    payload: CurrentUserState
}

export interface TotalUserCount {
    type: 'TOTAL_USER_COUNT',
    payload: number
}

export interface ReceiveUserAvatar {
    type: 'CHANGE_USER_AVATAR',
    payload: {
        user_avatar: string
    }
}

export interface UpdateUserInfo {
    type: 'UPDATE_USER_INFO',
    payload: CurrentUserState
}


export const authTrue = (): Action => ({type: 'IS_AUTHORISED_TRUE'});

export const checkAuth = async (tokenStr: string | null) => {
    return await instance
        .get('/auth/me/',
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .then(function (response) {
            store.dispatch({
                type: 'RECEIVE_CURRENT_USER',
                payload: response.data.result
            })
            return true;
        })
        .catch(function (error) {
            // toast.error("Failed to authenticate!", {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // })
            return false;
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

export const getTotalSizeUsers = async (tokenStr: string | null) => {
    return await instance
        .get(`/users/`,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .then(function (response) {
            store.dispatch({
                type: 'TOTAL_USER_COUNT',
                payload: response.data.result.pagination.total_results
            })
            return response.data.result.pagination.total_results;
        })
        .catch(function (error) {
            toast.error("Failed to get total user count", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
}

export const getAllUsers = async (tokenStr: string | null, page: number, size: number) => {
    return await instance
        .get(`/users/?page=${page}&page_size=${size}`,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .then(function (response) {
            store.dispatch({
                type: 'RECEIVE_ALL_USERS',
                payload: response.data.result.users
            })

        })
        .catch(function (error) {
            toast.error("Failed to get all users", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });


}

export const getUserById = async (tokenStr: string | null, id: number) => {
    return await instance
        .get(`/user/${id}/`,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .then(function (response) {
            store.dispatch({
                type: "RECEIVE_USER_BY_ID",
                payload: response.data.result
            })
            return response.data.result
        })
        .catch(function (error) {
            toast.error("Failed to get user by ID", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const changeUserAvatar = async (tokenStr: string | null, id: number, file: File) => {
    let formData = new FormData();

    formData.append("file", file);
    return await instance
        .put(`/user/${id}/update_avatar/`, formData,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`,
                    'Content-Type': "multipart/form-data",
                    'Accept': 'application/json'
                }
            }
        )
        .then(function (response) {
            store.dispatch({
                type: "CHANGE_USER_AVATAR",
                payload: {
                    user_avatar: response.data.result
                }
            })
        })
        .catch(function (error) {
            toast.error("Failed to set user avatar", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateUserInfo = async (tokenStr: string | null, id: number, user: CurrentUserState) => {
    return await instance
        .put(`/user/${id}/update_info/`,
            user,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .then(function (response) {
            store.dispatch({
                type: 'UPDATE_USER_INFO',
                payload: user
            })
        })
        .catch(function (error) {
            toast.error("Failed to update user info", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateUserPassword = async (tokenStr: string | null,
                                         id: number,
                                         user_password:string,
                                         user_password_repeat: string)=>{
    return await instance
        .put(`/user/${id}/update_password/`,
            {
                "user_password": user_password,
                "user_password_repeat": user_password_repeat
            },
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .catch(function (error) {
            toast.error("Failed to update user password", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteUser = async(tokenStr: string | null, id: number) => {
    return await instance
        .delete(`/user/${id}/`,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .catch(function (error) {
            toast.error("Failed to delete user", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const pagination = async (tokenStr: string | null, page: number, size: number) => {
    return await instance
        .get(`/users/?page=${page}&page_size=${size}`,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .then(function (response){
            store.dispatch({
                type: 'RECEIVE_ALL_USERS',
                payload: response.data.result.users
            })
            return response.data.result.users
        })
        .catch(function (error) {
            toast.error("Failed to get user in this page", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}
