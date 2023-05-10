import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {currentUserReducer} from "./reducers/currentUserReducer";
import {allUsersReducer} from "./reducers/allUsersReducer";
import {authReducer} from "./reducers/authReducer";
import {AllCompaniesState, AllUsersState, CompanyState, CurrentUserState, IsUserAuthorisedState} from "../types";
import {allCompaniesReducer} from "./reducers/allCompaniesReducer";

export interface RootState {
    currentUser: CurrentUserState,
    allUser: AllUsersState,
    isAuthorised: IsUserAuthorisedState,
    company : CompanyState,
    allCompanies : AllCompaniesState
}

export const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    isAuthorised: authReducer,
    allUser: allUsersReducer,
    allCompanies: allCompaniesReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
