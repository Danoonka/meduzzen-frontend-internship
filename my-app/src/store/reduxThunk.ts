import {
    acceptInvite,
    acceptRequest,
    addQuestionForQuiz,
    addToBlackList,
    addUser,
    BlackList,
    changeUserAvatar,
    checkAuth,
    createCompany,
    createInvite,
    createQuiz,
    createRequest,
    declineAction,
    deleteCompany,
    deleteQuestion,
    deleteQuiz,
    deleteUser,
    fireLeaveMember,
    getCompanyById,
    getGlobalRating,
    getGlobalRatingAnalytic,
    getLastAnswersCsvFoeQuizInCompany,
    getLastAnswersCsvForCompany,
    getLastAnswersCsvForUser,
    getLastAnswersCsvForUserInCompany,
    getNotificationList,
    getQuizById,
    getQuizList,
    getRatingAnalyticInCompany,
    getRatingAnalyticsForQuiz, getSummaryRatingAnalyticForQuiz,
    getSummaryRatingAnalyticForUser,
    getSummaryRatingAnalyticForUsers,
    getUserById,
    invitesList,
    invitesListCompany,
    logInUser,
    makeMemberAdmin, markNotificationAsRead,
    membersListCompany,
    myCompanyList,
    pagination,
    quizzesLastPass,
    quizzesLastPassCompany,
    removeAdmin,
    removeFromBlackList,
    requestList,
    requestListCompany,
    takeQuiz,
    updateCompanyAvatar,
    updateCompanyInfo,
    updateCompanyVisible,
    updateQuestion,
    updateQuiz,
    updateUserInfo,
    updateUserPassword
} from "../api/api";
import {store} from "./store";

import {
    changeUserAvatarAction, receiveAllCompaniesAction,
    receiveAllUsersAction, receiveCompanyByIdAction,
    receiveCurrentUserAction, receivePaginationInfo, receivePaginationUserInfo, receiveUserByIdAction,
    updateUserInfoAction
} from "./userActionCreators";
import {NewUser} from "../pages/UserRegistration";
import {toast} from "react-toastify";
import {CompanyState, CurrentUserState, EditQuestionState, EditQuizState, NewQuizState, QuestionState} from "../types";


export const checkAuthThunk = async () => {
    return await checkAuth()
        .then((res) => {
            store.dispatch(receiveCurrentUserAction(res.data.result))
            return true
        })
        .catch(function () {
            localStorage.removeItem('accessToken')
            return false
        });
}

export const addUserThunk = async (user: NewUser) => {
    return await addUser(user)
        .then(() => {
            return true
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        });
}

export const logInUserThunk = async (email: string, password: string) => {
    return await logInUser(email, password)
        .then(res => {
            localStorage.setItem('accessToken', res.data.result.access_token);
            return true;
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        });
}

export const getUserByIdThunk = async (id: number) => {
    return await getUserById(id)
        .then(res => {
            store.dispatch(receiveUserByIdAction(res.data.result))
            return res.data
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const changeUserAvatarThunk = async (id: number, file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    return await changeUserAvatar(id, formData)
        .then(res => {
            store.dispatch(changeUserAvatarAction(res.data.result))
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateUserInfoThunk = async (id: number, user: CurrentUserState) => {
    return await updateUserInfo(id, user)
        .then(() => store.dispatch(updateUserInfoAction(user)))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteUserThunk = async (id: number) => {
    return await deleteUser(id)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })

}

export const updateUserPasswordThunk = async (id: number,
                                              user_password: string,
                                              user_password_repeat: string) => {
    return await updateUserPassword(id, user_password, user_password_repeat)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const paginationThunk = async (item: string, page?: number, size?: number) => {
    return await pagination(item, page, size)
        .then(res => {
            if (item === 'users') {
                store.dispatch(receiveAllUsersAction(res.data.result.users))
                store.dispatch(receivePaginationUserInfo(res.data.result.pagination))
            } else if (item === 'companies') {
                store.dispatch(receiveAllCompaniesAction(res.data.result.companies))
                store.dispatch(receivePaginationInfo(res.data.result.pagination))
            }
            return res.data.result.pagination
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const createCompanyThunk = async (company: CompanyState) => {
    return await createCompany(company)
        .then(res => {
            return res.data.result.company_id
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return -1
        })
}

export const updateCompanyInfoThunk = async (id: number, company: CompanyState) => {
    return await updateCompanyInfo(id, company)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateCompanyVisibleThunk = async (id: number, is_visible: boolean) => {
    return await updateCompanyVisible(id, is_visible)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateCompanyAvatarThunk = async (id: number, file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    return await updateCompanyAvatar(id, formData)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteCompanyThunk = async (id: number) => {
    return await deleteCompany(id)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getCompanyByIdThunk = async (id: number) => {
    return await getCompanyById(id)
        .then(res => {
            store.dispatch(receiveCompanyByIdAction(res.data.result))
            return res.data
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const createInviteThunk = async (user_id: number, company_id: number) => {
    return await createInvite(user_id, company_id)
        .then(() => {
                toast.success('Successfully invited', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        )
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const declineActionThunk = async (action_id: number) => {
    return await declineAction(action_id)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const acceptInviteThunk = async (action_id: number) => {
    return await acceptInvite(action_id)
        .then(() => {
            toast.success('Successfully accepted', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const createRequestThunk = async (company_id: number) => {
    return await createRequest(company_id)
        .then(() => {
            toast.success('Successfully requested', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const acceptRequestThunk = async (action_id: number) => {
    return await acceptRequest(action_id)
        .then(() => {
            toast.success('Successfully accepted', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const fireLeaveMemberThunk = async (action_id: number) => {
    return await fireLeaveMember(action_id)
        .then(() => {
            toast.success('Successfully left', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const requestListThunk = async (user_id: number) => {
    return await requestList(user_id)
        .then(res => (res.data))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const invitesListThunk = async (user_id: number) => {
    return await invitesList(user_id)
        .then(res => (res.data))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const invitesListCompanyThunk = async (company_id: number) => {
    return await invitesListCompany(company_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const membersListCompanyThunk = async (company_id: number) => {
    return await membersListCompany(company_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const myCompanyListThunk = async (user_id: number) => {
    return await myCompanyList(user_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const requestListCompanyThunk = async (company_id: number) => {
    return await requestListCompany(company_id)
        .then(res => (res.data))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const BlackListThunk = async (company_id: number) => {
    return await BlackList(company_id)
        .then(res => (res.data))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const removeFromBlackListThunk = async (action_id: number) => {
    return await removeFromBlackList(action_id)
        .then(() => {
            toast.success('Removed from black list', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const addToBlackListThunk = async (action_id: number) => {
    return await addToBlackList(action_id)
        .then(() => {
            toast.success('Added to black list', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const makeMemberAdminThunk = async (action_id: number) => {
    return await makeMemberAdmin(action_id)
        .then(() => {
            toast.success('Added to admin', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const removeAdminThunk = async (action_id: number) => {
    return await removeAdmin(action_id)
        .then(() => {
            toast.success('Remove admin', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getQuizByIdThunk = async (quiz_id: number) => {
    return await getQuizById(quiz_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getQuizListThunk = async (company_id: number) => {
    return await getQuizList(company_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteQuizThunk = async (quiz_id: number) => {
    return await deleteQuiz(quiz_id)
        .then(() => {
            toast.success('Quiz deleted', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const createQuizThunk = async (quiz: NewQuizState) => {
    return await createQuiz(quiz)
        .then(() => {
            toast.success('Quiz created', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateQuizThunk = async (quiz_id: number, quiz: EditQuizState) => {
    return await updateQuiz(quiz_id, quiz)
        .then(() => {
            toast.success('Quiz updated', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const addQuestionForQuizThunk = async (question: QuestionState, quiz_id: number) => {
    return await addQuestionForQuiz(question, quiz_id)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteQuestionThunk = async (question_id: number) => {
    return await deleteQuestion(question_id)
        .then(() => {
            toast.success('Question deleted', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const updateQuestionThunk = async (question_id: number, question: EditQuestionState) => {
    return await updateQuestion(question_id, question)
        .then(() => {
            toast.success('Question updated', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const takeQuizThunk = async (quiz_id: number, answers: { [key: string]: string }) => {
    return await takeQuiz(quiz_id, answers)
        .then((res) => {
            toast.success(`Your result is ${res.data.result.result_score}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getGlobalRatingThunk = async (user_id: number) => {
    return await getGlobalRating(user_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const getGlobalRatingAnalyticThunk = async (user_id: number) => {
    return await getGlobalRatingAnalytic(user_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const getRatingAnalyticInCompanyThunk = async (user_id: number, company_id: number) => {
    return await getRatingAnalyticInCompany(user_id, company_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const getRatingAnalyticsForQuizThunk = async (user_id: number, quiz_id: number) => {
    return await getRatingAnalyticsForQuiz(user_id, quiz_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const getSummaryRatingAnalyticForUsersThunk = async (company_id: number) => {
    return await getSummaryRatingAnalyticForUsers(company_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const getSummaryRatingAnalyticForUserThunk = async (company_id: number, user_id: number) => {
    return await getSummaryRatingAnalyticForUser(company_id, user_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const getSummaryRatingAnalyticForQuizThunk = async (company_id: number, quiz_id: number) => {
    return await getSummaryRatingAnalyticForQuiz(company_id, quiz_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const quizzesLastPassThunk = async (user_id: number) => {
    return await quizzesLastPass(user_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

export const quizzesLastPassCompanyThunk = async (company_id: number) => {
    return await quizzesLastPassCompany(company_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
};

const FileDownload = require('js-file-download');

export const getLastAnswersCsvForUserThunk = async (user_id: number) => {
    return await getLastAnswersCsvForUser(user_id)
        .then(res => {
            FileDownload(res.data, 'getLastAnswersCsvForUser.csv');
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getLastAnswersCsvForCompanyThunk = async (company_id: number) => {
    return await getLastAnswersCsvForCompany(company_id)
        .then(res => {
            FileDownload(res.data, 'getLastAnswersCsvForCompany.csv')
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getLastAnswersCsvForUserInCompanyThunk = async (company_id: number, user_id: number) => {
    return await getLastAnswersCsvForUserInCompany(company_id, user_id)
        .then(res => FileDownload(res.data, 'getLastAnswersCsvForUserInCompany.csv'))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getLastAnswersCsvFoeQuizInCompanyThunk = async (company_id: number, quiz_id: number) => {
    return await getLastAnswersCsvFoeQuizInCompany(company_id, quiz_id)
        .then(res => FileDownload(res.data, 'getLastAnswersCsvFoeQuizInCompany.csv'))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const getNotificationListThunk = async (user_id: number) => {
    return await getNotificationList(user_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const markNotificationAsReadThunk = async (user_id: number, notification_id: number) => {
    return await markNotificationAsRead(user_id, notification_id)
        .then(res => res.data)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}
