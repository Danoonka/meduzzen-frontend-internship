import {Action} from "../actions";
import {initialPaginationInfoState} from "../../types";



export function paginationReducer(state = initialPaginationInfoState , action: Action) {
    switch (action.type) {
        case 'SET_PAGINATION_COMPANY':
            return  action.payload;
        default:
            return state;
    }
}