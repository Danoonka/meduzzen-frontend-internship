import {CurrentUserState} from "./reducers/currentUserReducer";
import {Action} from "./actions";
import {AllUsersState} from "./reducers/allUsersReducer";


export const receiveCurrentUserAction = (payload: CurrentUserState): Action => ({
    type: 'RECEIVE_CURRENT_USER',
    payload,
});


export const receiveAllUsersAction = (payload: AllUsersState): Action => ({
    type: 'RECEIVE_ALL_USERS',
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

export const authTrue = (): Action => ({type: 'IS_AUTHORISED_TRUE'});
export const authFalse = (): Action => ({type: 'IS_AUTHORISED_FALSE'});