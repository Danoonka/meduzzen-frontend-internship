import {ThunkAction} from "redux-thunk";
import {State} from "./store";
import {Dispatch} from "redux";
import {instance} from "../api/api";

export type Action =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | {type: 'SERVER_OK', payload: boolean}
    | {type: 'SERVER_FAIL', payload: boolean};

export const increment = (): Action => ({ type: 'INCREMENT' });
export const decrement = (): Action => ({ type: 'DECREMENT' });

export const checkHealth = (): ThunkAction<void, State, unknown, Action> => {
    return (dispatch: Dispatch) => {
        instance
            .get('/')
            .then(function (response) {
                dispatch({
                    type: 'SERVER_OK',
                    payload: true,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: 'SERVER_FAIL',
                    payload: false,
                });
            })
    };
};


