import {Action} from "../actions";
import {initialCurrentUserState} from "../../types";


export function currentUserReducer(state = initialCurrentUserState, action: Action) {
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
