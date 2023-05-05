import {Action} from "../actions";

export interface IsUserAuthorisedState {
    isAuthorised: boolean
}

export const initialIsUserAuthorisedState: IsUserAuthorisedState = {
    isAuthorised: false
}


export const authReducer =  (state:IsUserAuthorisedState = initialIsUserAuthorisedState, action: Action) => {
    switch (action.type) {
        case 'IS_AUTHORISED_TRUE':
            return {...state, isAuthorised: true}
        default:
            return state;
    }
};
