import {AllCompaniesState, AllUsersState, CompanyState, CurrentUserState} from "../types";

export type Action =
    | { type: "RECEIVE_CURRENT_USER", payload: CurrentUserState }
    | { type: "IS_AUTHORISED_TRUE" }
    | { type: "IS_AUTHORISED_FALSE" }
    | { type: "RECEIVE_ALL_USERS", payload: AllUsersState }
    | { type: "RECEIVE_ALL_COMPANIES", payload: AllCompaniesState }
    | { type: 'CHANGE_USER_AVATAR', payload: { user_avatar: string } }
    | { type: 'UPDATE_USER_INFO', payload: CurrentUserState }
