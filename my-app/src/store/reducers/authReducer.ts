import {Action} from "../actions";
import {initialIsUserAuthorisedState, IsUserAuthorisedState} from "../../types";

export const authReducer =  (state:IsUserAuthorisedState = initialIsUserAuthorisedState, action: Action) => {
    switch (action.type) {
        case 'IS_AUTHORISED_TRUE':
            return {...state, isAuthorised: true}
        case 'IS_AUTHORISED_FALSE':
            return  {...state, isAuthorised: false}
        default:
            return state;
    }
};
