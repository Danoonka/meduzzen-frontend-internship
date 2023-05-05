import {ReceiveServerDataAction} from "../actions";

export interface CurrentUserState {
    serverData: {
        "user_id": 0,
        "user_email": string,
        "user_firstname": string,
        "user_lastname": string,
        "user_avatar": string,
        "user_status": string,
        "user_city": string,
        "user_phone": string,
        "user_links": [
            string
        ],
    }
}

export const initialCurrentUserState: CurrentUserState = {
    serverData: {
        user_id: 0,
        user_email: '',
        user_firstname: '',
        user_lastname: '',
        user_avatar: '',
        user_status: '',
        user_city: '',
        user_phone: '',
        user_links: [
            ''
        ]

    }
};


export function currentUserReducer(state = initialCurrentUserState, action: ReceiveServerDataAction) {
    switch (action.type) {
        case 'RECEIVE_CURRENT_USER':
            return {...state, serverData: action.payload};
        default:
            return state;
    }
}
