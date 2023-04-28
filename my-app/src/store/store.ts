import { createStore } from 'redux';

interface State {
    testNumber: number;
}

const initialState: State = {
    testNumber: 0
};


type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };


const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, testNumber: state.testNumber + 1 };
        case 'DECREMENT':
            return { ...state, testNumber: state.testNumber - 1 };
        default:
            return state;
    }
};

export const store = createStore(reducer);
