import {Action} from "../actions";
import {initialAllUsersState} from "../../types";

export function allUsersReducer(state = initialAllUsersState, action: Action) {
    switch (action.type) {
        case 'RECEIVE_ALL_USERS':
            return {...state, users: action.payload};
        default:
            return state;
    }
}
