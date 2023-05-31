import {Action} from "../actions";
import {initialCompanyState} from "../../types";

export function CompanyByIdReducer(state = initialCompanyState, action: Action) {
    switch (action.type) {
        case 'RECEIVE_COMPANY_BY_ID':
            return action.payload
        default:
            return state;
    }
}