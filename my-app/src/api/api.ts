import axios from "axios";
import {store} from "../store/store";
import {
    changeUserAvatarAction,
    receiveAllCompaniesAction,
    receiveAllUsersAction,
    receiveCurrentUserAction,
    updateUserInfoAction
} from '../store/userActionCreators'
import {NewUser} from "../pages/UserRegistration";
import {toast} from "react-toastify";
import {CompanyState, CurrentUserState} from "../types";

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

export const pagination = async (item: string, page: number, size: number) => {
    return await instance
        .get(`/${item}/?page=${page}&page_size=${size}`)
        .then(function (response) {
            if (item === 'users') {
                store.dispatch(receiveAllUsersAction(response.data.result.users))
            } else if (item === 'companies') {
                store.dispatch(receiveAllCompaniesAction(response.data.result.companies))
            }
            return response.data.result.pagination
        })
        .catch(function (error) {
            toast.error("Failed to get items in this page", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}


export const createCompany = async (company: CompanyState) => {
    return await instance
        .post('/company/',
            {
                company_name: company.company_name,
                is_visible: company.is_visible
            })
        .then(function (response) {
            return response.data.result.company_id
        })
        .catch(function (error) {
            toast.error("Failed to create company", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return -1
        })
}

export const updateCompanyInfo = async (id: number, company: CompanyState) => {
    return await instance
        .put(`/company/${id}/update_info/`,
            {
                company_name: company.company_name,
                company_title: company.company_title,
                company_description: company.company_description,
                company_city: company.company_city,
                company_phone: company.company_phone,
                company_links: company.company_links
            })
        .catch(function (error) {
            toast.error("Failed to update company info", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateCompanyVisible = async (id: number, is_visible: boolean) => {
    return await instance
        .put(`/company/${id}/update_visible/`, {is_visible: is_visible})
        .catch(function (error) {
            toast.error("Failed to update visibility", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateCompanyAvatar = async (id: number, file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    return await instance
        .put(`/company/${id}/update_avatar/`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        })
        .catch(function (error) {
            toast.error("Failed to update company avatar", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteCompany = async (id: number) => {
    return await instance
        .delete(`/company/${id}/`)
        .catch(function (error) {
            toast.error("Failed to delete company", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getCompanyById = async (id: number) => {
    return await instance
        .get(`/company/${id}/`)
        .then(function (response) {
            return response.data.result
        })
        .catch(function (error) {
            toast.error("Failed to get company", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}







