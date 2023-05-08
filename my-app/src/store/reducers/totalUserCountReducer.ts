import {TotalUserCount} from "../actions";

export interface TotalUserCountState {
    count: number
}

export const initialTotalUserCountState: TotalUserCountState = {
    count: 0
};


export function totalUserCountReducer(state = initialTotalUserCountState, action: TotalUserCount) {
    switch (action.type) {
        case 'TOTAL_USER_COUNT':
            return {...state, count: action.payload};
        default:
            return state;
    }
}
