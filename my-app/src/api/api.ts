import axios from "axios";
import { NewUser } from "../pages/UserRegistration";
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
});

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
    return instance.get('/auth/me/');
};

export const addUser = (user: NewUser) => {
    return instance.post("/user/", {
        user_password: user.user_password,
        user_password_repeat: user.user_password_repeat,
        user_email: user.user_email,
        user_firstname: user.user_firstname,
        user_lastname: user.user_lastname
    });
};

export const logInUser = (email: string, password: string) => {
    return instance.post('/auth/login/', {
        user_email: email,
        user_password: password
    });
};

export const getUserById = (id: number) => {
    return instance.get(`/user/${id}/`);
};

export const changeUserAvatar = (id: number, formData: FormData) => {
    return instance.put(`/user/${id}/update_avatar/`, formData, {
        headers: {
            'Content-Type': "multipart/form-data",
        }
    });
};

export const updateUserInfo = (id: number, user: CurrentUserState) => {
    return instance.put(`/user/${id}/update_info/`, user);
};

export const updateUserPassword = (id: number, user_password: string, user_password_repeat: string) => {
    return instance.put(`/user/${id}/update_password/`, {
        "user_password": user_password,
        "user_password_repeat": user_password_repeat
    });
};

export const deleteUser = (id: number) => {
    return instance.delete(`/user/${id}/`);
};

export const pagination = (item: string, page?: number, size?: number) => {
    return instance.get(`/${item}/`, {
        params: {
            page: page,
            page_size: size
        }
    });
};

export const createCompany = (company: CompanyState) => {
    return instance.post('/company/', {
        company_name: company.company_name,
        is_visible: company.is_visible
    });
};

export const updateCompanyInfo = (id: number, company: CompanyState) => {
    return instance.put(`/company/${id}/update_info/`, {
        company_name: company.company_name,
        company_title: company.company_title,
        company_description: company.company_description,
        company_city: company.company_city,
        company_phone: company.company_phone,
        company_links: company.company_links
    });
};

export const updateCompanyVisible = (id: number, is_visible: boolean) => {
    return instance.put(`/company/${id}/update_visible/`, { is_visible: is_visible });
};

export const updateCompanyAvatar = (id: number, formData: FormData) => {
    return instance.put(`/company/${id}/update_avatar/`, formData, {
        headers: {
            'Content-Type': "multipart/form-data",
        }
    });
};

export const deleteCompany = (id: number) => {
    return instance.delete(`/company/${id}/`);
};

export const getCompanyById = (id: number) => {
    return instance.get(`/company/${id}/`);
};

export const createInvite = (user_id: number, company_id: number) => {
    return instance.get(`/action/create_from_company/${company_id}/user/${user_id}/`);
};

export const declineAction = (action_id: number) => {
    return instance.get(`/action/${action_id}/decline_action/`);
};

export const acceptInvite = (action_id: number) => {
    return instance.get(`/action/${action_id}/accept_invite/`);
};

export const createRequest = (company_id: number) => {
    return instance.get(`/action/create_from_user/company/${company_id}/`);
};

export const acceptRequest = (action_id: number) => {
    return instance.get(`/action/${action_id}/accept_request/`);
};

export const fireLeaveMember = (action_id: number) => {
    return instance.get(`/action/${action_id}/leave_company/`);
};

export const requestList = (user_id: number) => {
    return instance.get(`/user/${user_id}/requests_list/`);
};

export const invitesList = (user_id: number) => {
    return instance.get(`/user/${user_id}/invites_list/`);
};

export const invitesListCompany = (company_id: number) => {
    return instance.get(`/company/${company_id}/invites_list/`);
};

export const requestListCompany = (company_id: number) => {
    return instance.get(`/company/${company_id}/requests_list/`);
};

export const membersListCompany = (company_id: number) => {
    return instance.get(`/company/${company_id}/members_list/`);
};

export const myCompanyList = (user_id: number) => {
    return instance.get(`user/${user_id}/companies_list/`);
};

export const BlackList = (company_id: number) => {
    return instance.get(`/company/${company_id}/blocked_list/`);
};

export const removeFromBlackList = (action_id: number) => {
    return instance.get(`/action/${action_id}/remove_from_block/`);
};

export const addToBlackList = (action_id: number) => {
    return instance.get(`/action/${action_id}/add_to_block/`);
};

export const makeMemberAdmin = (action_id: number) => {
    return instance.get(`/action/${action_id}/add_to_admin/`);
};

export const removeAdmin = (action_id: number) => {
    return instance.get(`/action/${action_id}/remove_from_admin/`);
};

export const getQuizById = (quiz_id: number) => {
    return instance.get(`/quiz/${quiz_id}/`);
};

export const getQuizList = (company_id: number) => {
    return instance.get(`/company/${company_id}/quizzes_list/`);
};

export const deleteQuiz = (quiz_id: number) => {
    return instance.delete(`/quiz/${quiz_id}/`);
};

export const createQuiz = (quiz: NewQuizState, company_id: number) => {
    return instance.post('/quiz/', {
        quiz_name: quiz.quiz_name,
        quiz_frequency: quiz.quiz_frequency,
        company_id: company_id,
        questions_list: quiz.questions_list
    });
};

export const updateQuiz = (quiz_id: number, quiz: EditQuizState) => {
    return instance.put(`/quiz/${quiz_id}/update_info/`, {
        quiz_name: quiz.quiz_name,
        quiz_title: quiz.quiz_title,
        quiz_description: quiz.quiz_description,
        quiz_frequency: quiz.quiz_frequency
    });
};

export const addQuestionForQuiz = (question: QuestionState, quiz_id: number) => {
    return instance.post(`/quiz/${quiz_id}/add_question/`, {
        question_text: question.question_text,
        question_answers: question.question_answers,
        question_correct_answer: question.question_correct_answer
    });
};

export const deleteQuestion = (question_id: number) => {
    return instance.delete(`/question/${question_id}/`);
};

export const updateQuestion = (question_id: number, question: EditQuestionState) => {
    return instance.put(`/question/${question_id}/update_info/`, {
        question_text: question.question_text,
        question_answers: question.question_answers,
        question_correct_answer: question.question_correct_answer
    });
};

export const takeQuiz = (quiz_id: number, answers: { [key: string]: string }) => {
    return instance.post(`/quiz/${quiz_id}/take_quiz/`, {'answers': answers});
};
