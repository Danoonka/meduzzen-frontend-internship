import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import {Action} from "./actions";



export interface State {
    testNumber: number;
    serverStatus: boolean;
}

export const initialState: State = {
    testNumber: 0,
    serverStatus: true,
};


const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, testNumber: state.testNumber + 1 };
        case 'DECREMENT':
            return { ...state, testNumber: state.testNumber - 1 };
        case 'SERVER_OK':
            return {...state, serverStatus: action.payload};
        case 'SERVER_FAIL':
            return {...state, serverStatus: action.payload}
        default:
            return state;
    }
};

export const store = createStore(reducer, applyMiddleware(thunk));
