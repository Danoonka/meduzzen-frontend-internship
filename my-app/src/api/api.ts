import axios from "axios";
import {NewUser} from "../pages/UserRegistration";
import {
    CompanyState,
    CurrentUserState,
    EditQuestionState,
    EditQuizState,
    NewQuizState,
    QuestionState
} from "../types";

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

export const pagination = (item: string, page?: number, size?: number) => {
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

export const createInvite = (user_id: number, company_id: number) => {
    return instance
        .get(`/action/create_from_company/${company_id}/user/${user_id}/`)
        .then(res => {
            return res
        })
}

export const declineAction = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/decline_action/`)
        .then(res => {
            return res
        })
}

export const acceptInvite = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/accept_invite/`)
        .then(res => {
            return res
        })
}

export const createRequest = (company_id: number) => {
    return instance
        .get(`/action/create_from_user/company/${company_id}/`)
        .then(res => {
            return res
        })
}

export const acceptRequest = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/accept_request/`)
        .then(res => {
            return res
        })
}

export const fireLeaveMember = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/leave_company/`)
        .then(res => {
            return res
        })
}

export const requestList = (user_id: number) => {
    return instance
        .get(`/user/${user_id}/requests_list/`)
        .then(res => {
            return res
        })
}

export const invitesList = (user_id: number) => {
    return instance
        .get(`/user/${user_id}/invites_list/`)
        .then(res => {
            return res
        })
}

export const invitesListCompany = (company_id: number) => {
    return instance
        .get(`/company/${company_id}/invites_list/`)
        .then(res => {
            return res
        })
}

export const requestListCompany = (company_id: number) => {
    return instance
        .get(`/company/${company_id}/requests_list/`)
        .then(res => {
            return res
        })
}

export const membersListCompany = (company_id: number) => {
    return instance
        .get(`/company/${company_id}/members_list/`)
        .then(res => {
            return res
        })
}

export const myCompanyList = (user_id: number) => {
    return instance
        .get(`user/${user_id}/companies_list/`)
        .then(res => {
            return res
        })
}

export const BlackList = (company_id: number) => {
    return instance
        .get(`/company/${company_id}/blocked_list/`)
        .then(res => {
            return res
        })
}

export const removeFromBlackList = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/remove_from_block/`)
        .then(res => {
            return res
        })
}

export const addToBlackList = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/add_to_block/`)
        .then(res => {
            return res
        })
}

export const makeMemberAdmin = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/add_to_admin/`)
        .then(res => {
            return res
        })
}

export const removeAdmin = (action_id: number) => {
    return instance
        .get(`/action/${action_id}/remove_from_admin/`)
        .then(res => {
            return res
        })
}

export const getQuizById = (quiz_id: number) => {
    return instance
        .get(`/quiz/${quiz_id}/`)
        .then(res => {
            return res
        })
}

export const getQuizList = (company_id: number) => {
    return instance
        .get(`/company/${company_id}/quizzes_list/`)
        .then(res => {
            return res
        })
}

export const deleteQuiz = (quiz_id: number) => {
    return instance
        .delete(`/quiz/${quiz_id}/`)
        .then(res => {
            return res
        })
}


export const createQuiz = (quiz: NewQuizState, company_id: number) => {
    return instance
        .post('/quiz/',
            {
                quiz_name: quiz.quiz_name,
                quiz_frequency: quiz.quiz_frequency,
                company_id: company_id,
                questions_list: quiz.questions_list
            })
        .then(res => {
            return res
        })
}

export const updateQuiz = (quiz_id: number, quiz: EditQuizState) => {
    return instance
        .put(`/quiz/${quiz_id}/update_info/`,
            {
                quiz_name: quiz.quiz_name,
                quiz_title: quiz.quiz_title,
                quiz_description: quiz.quiz_description,
                quiz_frequency: quiz.quiz_frequency
            })
        .then(res => {
            return res
        })
}

export const addQuestionForQuiz = (question: QuestionState, quiz_id: number) => {
    return instance
        .post(`/quiz/${quiz_id}/add_question/`, {
            question_text: question.question_text,
            question_answers: question.question_answers,
            question_correct_answer: question.question_correct_answer
        })
        .then(res => {
            return res
        })
}

export const deleteQuestion = (question_id: number) => {
    return instance
        .delete(`/question/${question_id}/`)
        .then(res => {
            return res
        })
}


export const updateQuestion = (question_id: number, question: EditQuestionState) => {
    return instance
        .put(`/question/${question_id}/update_info/`, {
            question_text: question.question_text,
            question_answers: question.question_answers,
            question_correct_answer: question.question_correct_answer
        })
        .then(res => {
            return res
        })
}












