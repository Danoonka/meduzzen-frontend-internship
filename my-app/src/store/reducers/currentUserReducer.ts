import {ReceiveServerDataAction, ReceiveUserAvatar, UpdateUserInfo} from "../actions";

export interface CurrentUserState {
    "user_id": number,
    "user_email": string,
    "user_firstname": string,
    "user_lastname": string,
    "user_avatar": string,
    "user_status": string,
    "user_city": string,
    "user_phone": string,
    "user_links": string[],
}

export const initialCurrentUserState: CurrentUserState = {
    user_id: -1,
    user_email: '',
    user_firstname: '',
    user_lastname: '',
    user_avatar: '',
    user_status: '',
    user_city: '',
    user_phone: '',
    user_links: [
        ''
    ]
};


export function currentUserReducer(state = initialCurrentUserState,
                                   action:
                                       | ReceiveServerDataAction
                                       | ReceiveUserAvatar
                                       | UpdateUserInfo) {
    switch (action.type) {
        case 'RECEIVE_CURRENT_USER':
            return action.payload
        case 'CHANGE_USER_AVATAR' :
            return {
                ...state,
                user_avatar: action.payload.user_avatar,
            }
        case 'UPDATE_USER_INFO' :
            return action.payload
        default:
            return state;
    }
}
