import axios from "axios";
import {NewUser} from "../pages/UserRegistration";
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

export const checkAuth = () => {
    return instance
        .get('/auth/me/')
        .then(function (response) {
            return response
        })
}

export const addUser = (user: NewUser) => {
    return instance
        .post("/user/", {
            user_password: user.user_password,
            user_password_repeat: user.user_password_repeat,
            user_email: user.user_email,
            user_firstname: user.user_firstname,
            user_lastname: user.user_lastname
        })
        .then(function (response) {
            return response
        })
}

export const logInUser = (email: string, password: string) => {
    return instance
        .post('/auth/login/', {
            user_email: email,
            user_password: password
        })
        .then(function (response) {
            return response
        })
}

export const getUserById = (id: number) => {
    return instance
        .get(`/user/${id}/`)
        .then(function (response) {
            return response
        })
}

export const changeUserAvatar = (id: number, formData: FormData) => {
    return instance
        .put(`/user/${id}/update_avatar/`, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
            }
        )
        .then(function (response) {
            return response
        })
}

export const updateUserInfo = (id: number, user: CurrentUserState) => {
    return instance
        .put(`/user/${id}/update_info/`, user)
        .then(function (response) {
            return response
        })
}

export const updateUserPassword = (id: number,
                                   user_password: string,
                                   user_password_repeat: string) => {
    return instance
        .put(`/user/${id}/update_password/`,
            {
                "user_password": user_password,
                "user_password_repeat": user_password_repeat
            })
        .then(response => {
            return response
        })
}

export const deleteUser = (id: number) => {
    return instance
        .delete(`/user/${id}/`)
        .then(response => {
            return response
        })
}

export const pagination = (item: string, page: number, size: number) => {
    return instance
        .get(`/${item}/`, {
            params: {
                page: page,
                page_size: size
            }
        })
        .then(response => {
            return response
        })
}


export const createCompany = (company: CompanyState) => {
    return instance
        .post('/company/',
            {
                company_name: company.company_name,
                is_visible: company.is_visible
            })
        .then(function (response) {
            return response
        })
}

export const updateCompanyInfo = (id: number, company: CompanyState) => {
    return instance
        .put(`/company/${id}/update_info/`,
            {
                company_name: company.company_name,
                company_title: company.company_title,
                company_description: company.company_description,
                company_city: company.company_city,
                company_phone: company.company_phone,
                company_links: company.company_links
            })
        .then(response => {
            return response
        })

}

export const updateCompanyVisible = (id: number, is_visible: boolean) => {
    return instance
        .put(`/company/${id}/update_visible/`, {is_visible: is_visible})
        .then(response => {
            return response
        })
}

export const updateCompanyAvatar = (id: number, formData: FormData) => {
    return instance
        .put(`/company/${id}/update_avatar/`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        })
        .then(res => {
            return res
        })
}

export const deleteCompany = (id: number) => {
    return instance
        .delete(`/company/${id}/`)
        .then(res => {
            return res
        })
}

export const getCompanyById = (id: number) => {
    return instance
        .get(`/company/${id}/`)
        .then(function (response) {
            return response
        })

}







