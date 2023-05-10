import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {currentUserReducer, CurrentUserState} from "./reducers/currentUserReducer";
import {allUsersReducer, AllUsersState} from "./reducers/allUsersReducer";
import {authReducer, IsUserAuthorisedState} from "./reducers/authReducer";

export interface RootState {
    currentUser: CurrentUserState,
    allUser: AllUsersState,
    isAuthorised: IsUserAuthorisedState,
}

export const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    isAuthorised: authReducer,
    allUser: allUsersReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
