import {Action} from "../actions";
import {initialAllCompaniesState} from "../../types";


export function allCompaniesReducer(state = initialAllCompaniesState, action: Action) {
    switch (action.type) {
        case 'RECEIVE_ALL_COMPANIES':
            return {...state, companies: action.payload};
        default:
            return state;
    }
}
