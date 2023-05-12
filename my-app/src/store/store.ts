import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {currentUserReducer} from "./reducers/currentUserReducer";
import {allUsersReducer} from "./reducers/allUsersReducer";
import {authReducer} from "./reducers/authReducer";
import {allCompaniesReducer} from "./reducers/allCompaniesReducer";
import {CompanyByIdReducer} from "./reducers/CompanyByIdReducer";
import {userByIdReducer} from "./reducers/userByIdReducer";
import {paginationReducer} from "./reducers/paginationReducer";


export const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    userById: userByIdReducer,
    isAuthorised: authReducer,
    allUser: allUsersReducer,
    allCompanies: allCompaniesReducer,
    company: CompanyByIdReducer,
    paginationInfo: paginationReducer
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));
