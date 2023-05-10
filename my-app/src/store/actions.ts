import {CurrentUserState} from "./reducers/currentUserReducer";
import {AllUsersState} from "./reducers/allUsersReducer";


export type Action =
    | { type: "RECEIVE_CURRENT_USER", payload: CurrentUserState }
    | { type: "IS_AUTHORISED_TRUE" }
    | { type: "IS_AUTHORISED_FALSE" }
    | { type: "RECEIVE_ALL_USERS", payload: AllUsersState }
    | { type: 'CHANGE_USER_AVATAR', payload: { user_avatar: string } }
    | { type: 'UPDATE_USER_INFO', payload: CurrentUserState }
