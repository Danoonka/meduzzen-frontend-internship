import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {authReducer} from "./reducers/authReducer";
import {currentUserReducer} from "./reducers/currentUserReducer";
import {counterReducer} from "./reducers/counterReducer";
import {serverReducer} from "./reducers/serverReducer";

export const rootReducer = combineReducers({
    server: serverReducer,
    counter: counterReducer,
    currentUser: currentUserReducer,
    isAuthorised: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
