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
    return instance.post("/user/", {...user});
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
        user_password: user_password,
        user_password_repeat: user_password_repeat
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
    return instance.post('/company/', {...company});
};

export const updateCompanyInfo = (id: number, company: CompanyState) => {
    return instance.put(`/company/${id}/update_info/`, {...company});
};

export const updateCompanyVisible = (id: number, is_visible: boolean) => {
    return instance.put(`/company/${id}/update_visible/`, {is_visible: is_visible});
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

export const createQuiz = (quiz: NewQuizState) => {
    return instance.post('/quiz/', {...quiz});
};

export const updateQuiz = (quiz_id: number, quiz: EditQuizState) => {
    return instance.put(`/quiz/${quiz_id}/update_info/`, {...quiz});
};

export const addQuestionForQuiz = (question: QuestionState, quiz_id: number) => {
    return instance.post(`/quiz/${quiz_id}/add_question/`, {...question});
};

export const deleteQuestion = (question_id: number) => {
    return instance.delete(`/question/${question_id}/`);
};

export const updateQuestion = (question_id: number, question: EditQuestionState) => {
    return instance.put(`/question/${question_id}/update_info/`, {...question});
};

export const takeQuiz = (quiz_id: number, answers: { [key: string]: string }) => {
    return instance.post(`/quiz/${quiz_id}/take_quiz/`, {'answers': answers});
};

export const getGlobalRating = (user_id: number) => {
    return instance.get(`/user/${user_id}/global_rating/`);
};

export const getGlobalRatingAnalytic = (user_id: number) => {
    return instance.get(`/user/${user_id}/global_rating_analytic/`);
};

export const getRatingInCompany = (user_id: number, company_id: number) => {
    return instance.get(`/user/${user_id}/rating_in_company/${company_id}/`);
};

export const getRatingAnalyticInCompany = (user_id: number, company_id: number) => {
    return instance.get(`/user/${user_id}/rating_analytic_in_company/${company_id}/`);
};

export const getRatingForQuiz = (user_id: number, quiz_id: number) => {
    return instance.get(`/user/${user_id}/rating_for_quiz/${quiz_id}/`);
};

export const getRatingAnalyticsForQuiz = (user_id: number, quiz_id: number) => {
    return instance.get(`/user/${user_id}/rating_analytic_for_quiz/${quiz_id}/`);
};

export const getSummaryRatingAnalyticForUsers = (company_id: number) => {
    return instance.get(`/company/${company_id}/summary_rating_analytic_for_users/`);
};

export const getSummaryRatingForUser = (company_id: number, user_id: number) => {
    return instance.get(`/company/${company_id}/summary_rating_for_user/${user_id}/`);
};

export const getSummaryRatingAnalyticForUser = (company_id: number, user_id: number) => {
    return instance.get(`/company/${company_id}/summary_rating_analytic_for_user/${user_id}/`);
};

export const getSummaryRatingAnalyticForQuiz = (company_id: number, quiz_id: number) => {
    return instance.get(`/company/${company_id}/summary_rating_analytic_for_quiz/${quiz_id}/`);
};

export const quizzesLastPass = (user_id: number) => {
    return instance.get(`user/${user_id}/quizzes_last_pass/`);
};

export const quizzesLastPassCompany = (company_id: number) => {
    return instance.get(`/company/${company_id}/quizzes_last_pass/`);
};

export const getLastAnswersCsvForUser = (user_id: number) => {
    return instance.get(`/user/${user_id}/last_answers_csv/`, {
        headers: {
            accept: '*/*'
        }
    })
}

export const getLastAnswersCsvForCompany = (company_id: number) => {
    return instance.get(`/company/${company_id}/last_answers_csv/`, {
        responseType: 'blob'
    })
}

export const getLastAnswersCsvForUserInCompany = (company_id: number, user_id: number) => {
    return instance.get(`/company/${company_id}/last_answers_csv_for_user/${user_id}/`, {
        responseType: 'blob'
    })
}

export const getLastAnswersCsvFoeQuizInCompany = (company_id: number, quiz_id: number) => {
    return instance.get(`/company/${company_id}/last_answers_csv_for_quiz/${quiz_id}/`, {
        responseType: 'blob'
    })
}

export const getNotificationList = (user_id: number) => {
    return instance.get(`/user/${user_id}/notifications_list/`);
}

export const markNotificationAsRead = (user_id: number, notification_id: number) => {
    return instance.get(`/user/${user_id}/mark_notification_as_read/${notification_id}/`);
}
