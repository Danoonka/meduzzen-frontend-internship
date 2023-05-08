import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {authReducer, IsUserAuthorisedState} from "./reducers/authReducer";
import {currentUserReducer, CurrentUserState} from "./reducers/currentUserReducer";
import {allUsersReducer, AllUsersState} from "./reducers/allUsersReducer";
import {userByIdReducer} from "./reducers/userByIdReducer";
import {totalUserCountReducer, TotalUserCountState} from "./reducers/totalUserCountReducer";

export interface RootState {
    currentUser: CurrentUserState,
    isAuthorised: IsUserAuthorisedState,
    allUser: AllUsersState,
    totalUserCount: TotalUserCountState
}

export const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    isAuthorised: authReducer,
    allUser: allUsersReducer,
    userById: userByIdReducer,
    totalUserCount: totalUserCountReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
