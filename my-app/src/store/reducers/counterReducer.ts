import {Action} from "../actions";

export interface CounterState {
    testNumber: number;
}

export const initialCounterState: CounterState = {
    testNumber: 0,
};

export const counterReducer = (state: CounterState = initialCounterState, action: Action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, testNumber: state.testNumber + 1};
        case 'DECREMENT':
            return {...state, testNumber: state.testNumber - 1};
        default:
            return state;
    }
};
