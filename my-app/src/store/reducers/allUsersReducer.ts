import {Action} from "../actions";
import {CurrentUserState, initialCurrentUserState} from "./currentUserReducer";

export interface AllUsersState {
    users: [
        CurrentUserState
    ]
}

export const initialAllUsersState: AllUsersState = {
    users: [initialCurrentUserState]
};


export function allUsersReducer(state = initialAllUsersState, action: Action) {
    switch (action.type) {
        case 'RECEIVE_ALL_USERS':
            return {...state, users: action.payload};
        default:
            return state;
    }
}
