import {ReceiveUserById} from "../actions";
import {initialCurrentUserState} from "./currentUserReducer";

export function userByIdReducer(state = initialCurrentUserState, action: ReceiveUserById) {
    switch (action.type) {
        case 'RECEIVE_USER_BY_ID':
            return action.payload;
        default:
            return state;
    }
}
