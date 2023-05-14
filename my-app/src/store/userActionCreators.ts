import {Action} from "./actions";
import {AllCompaniesState, AllUsersState, CompanyState, CurrentUserState, PaginationInfoState} from "../types";

export const receiveCurrentUserAction = (payload: CurrentUserState): Action => ({
    type: 'RECEIVE_CURRENT_USER',
    payload,
});

export const receiveUserByIdAction = (payload: CurrentUserState): Action => ({
    type: "RECEIVE_USER_BY_ID",
    payload
})

export const receiveCompanyByIdAction = (payload: CompanyState): Action => ({
    type: "RECEIVE_COMPANY_BY_ID",
    payload
})

export const receiveAllUsersAction = (payload: AllUsersState): Action => ({
    type: 'RECEIVE_ALL_USERS',
    payload,
});

export const receiveAllCompaniesAction = (payload: AllCompaniesState): Action => ({
    type: 'RECEIVE_ALL_COMPANIES',
    payload,
});

export const changeUserAvatarAction = (user_avatar: string): Action => ({
    type: 'CHANGE_USER_AVATAR',
    payload: {
        user_avatar,
    },
});

export const updateUserInfoAction = (payload: CurrentUserState): Action => ({
    type: 'UPDATE_USER_INFO',
    payload,
});

export const receivePaginationInfo = (payload: PaginationInfoState): Action => ({
    type: 'SET_PAGINATION_COMPANY',
    payload
})

export const receivePaginationUserInfo = (payload: PaginationInfoState): Action => ({
    type: 'SET_PAGINATION_USER',
    payload
})


export const authTrue = (): Action => ({type: 'IS_AUTHORISED_TRUE'});
export const authFalse = (): Action => ({type: 'IS_AUTHORISED_FALSE'});