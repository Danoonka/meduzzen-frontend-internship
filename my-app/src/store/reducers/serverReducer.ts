import {Action} from "../actions";

export interface ServerState {
    serverStatus: boolean;
}

export const initialServerState: ServerState = {
    serverStatus: true,
};




export const serverReducer = (state: ServerState = initialServerState, action: Action) => {
    switch (action.type) {
        case 'SERVER_OK':
            return {...state, serverStatus: action.payload};
        case 'SERVER_FAIL':
            return {...state, serverStatus: action.payload}
        default:
            return state;
    }
};
