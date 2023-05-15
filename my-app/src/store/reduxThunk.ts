import {
    acceptInvite,
    acceptRequest, addToBlackList,
    addUser, BlackList,
    changeUserAvatar,
    checkAuth,
    createCompany,
    createInvite,
    createRequest,
    declineAction,
    deleteCompany,
    deleteUser,
    fireLeaveMember,
    getCompanyById,
    getUserById, invitesList, invitesListCompany,
    logInUser, membersListCompany, myCompanyList,
    pagination, removeFromBlackList, requestList, requestListCompany,
    updateCompanyAvatar,
    updateCompanyInfo,
    updateCompanyVisible,
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
import {CompanyState, CurrentUserState} from "../types";

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
        })
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const createInviteThunk = async (user_id: number, company_id: number) => {
    return await createInvite(user_id, company_id)
        .then(res => {
                toast.success('Successfully invited', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                return res
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
        .then(res => (res))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const acceptInviteThunk = async (action_id: number) => {
    return await acceptInvite(action_id)
        .then(res => {
                toast.success('Successfully accepted', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                return res
            }
        )
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const createRequestThunk = async (company_id: number) => {
    return await createRequest(company_id)
        .then(res => {
                toast.success('Successfully requested', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                return res
            }
        )
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const acceptRequestThunk = async (action_id: number) => {
    return await acceptRequest(action_id)
        .then(res => {
                toast.success('Successfully accepted', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                return res
            }
        )
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const fireLeaveMemberThunk = async (action_id: number) => {
    return await fireLeaveMember(action_id)
        .then(res => {
                toast.success('Successfully left', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                return res
            }
        )
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const requestListThunk = async (user_id: number) => {
    return await requestList(user_id)
        .then(res => (res))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const invitesListThunk = async (user_id: number) => {
    return await invitesList(user_id)
        .then(res => (res))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const invitesListCompanyThunk = async (company_id: number) => {
    return await invitesListCompany(company_id)
        .then(res => res)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const membersListCompanyThunk = async (company_id: number) => {
    return await membersListCompany(company_id)
        .then(res => res)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const myCompanyListThunk = async (user_id: number) => {
    return await myCompanyList(user_id)
        .then(res => res)
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}


export const requestListCompanyThunk = async (company_id: number) => {
    return await requestListCompany(company_id)
        .then(res => (res))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const BlackListThunk = async (company_id: number) => {
    return await BlackList(company_id)
        .then(res => (res))
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const removeFromBlackListThunk = async (action_id: number) => {
    return removeFromBlackList(action_id)
        .then(res => {
                toast.success('Removed from black list', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                return res
            }
        )
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const addToBlackListThunk = async (action_id: number) => {
    return addToBlackList(action_id)
        .then(res => {
                toast.success('Added to black list', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                return res
            }
        )
        .catch(function (error) {
            toast.error(error.response.data.detail, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}




