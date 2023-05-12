import {Action} from "../actions";
import {initialCurrentUserState} from "../../types";


export function userByIdReducer(state = initialCurrentUserState, action: Action) {
    switch (action.type) {
        case 'RECEIVE_USER_BY_ID':
            return action.payload;
        default:
            return state;
    }
}