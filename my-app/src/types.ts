import userImg from './assets/ffa09aec412db3f54deadf1b3781de2a.png'

export interface CurrentUserState {
    "user_id": number,
    "user_email": string,
    "user_firstname": string,
    "user_lastname": string,
    "user_avatar": string,
    "user_status": string,
    "user_city": string,
    "user_phone": string,
    "user_links": string[],
}

export const initialCurrentUserState: CurrentUserState = {
    user_id: -1,
    user_email: '',
    user_firstname: '',
    user_lastname: '',
    user_avatar: userImg,
    user_status: '',
    user_city: '',
    user_phone: '',
    user_links: [
        ''
    ]
};

export interface CompanyState {
    "company_id": number,
    "company_name": string,
    "company_title": string,
    "company_avatar": string,
    "is_visible": boolean,
    "company_description": string,
    "company_city": string,
    "company_phone": string,
    "company_links": string[],
    "company_owner": CurrentUserState

}

export const initialCompanyState: CompanyState = {
    company_id: -1,
    company_name: '',
    company_title: '',
    company_avatar: '',
    is_visible: true,
    company_description: '',
    company_city: '',
    company_phone: '',
    company_links: [
        ''
    ],
    company_owner: initialCurrentUserState
}


export interface AllUsersState {
    users: [
        CurrentUserState
    ]
}

export interface AllCompaniesState {
    companies: [
        CompanyState
    ]
}


export const initialAllUsersState: AllUsersState = {
    users: [initialCurrentUserState]
};

export const initialAllCompaniesState: AllCompaniesState = {
    companies: [initialCompanyState]
};

export interface IsUserAuthorisedState {
    isAuthorised: boolean
}

export const initialIsUserAuthorisedState: IsUserAuthorisedState = {
    isAuthorised: false
}

export interface PaginationInfoState {
    current_page: number,
    total_page: number,
    total_results: number
}

export const initialPaginationInfoState: PaginationInfoState = {
    current_page: 1,
    total_page: 1,
    total_results: -1
}

export interface ActionUserState {
    user_id: number,
    user_email: string,
    user_firstname: string,
    user_lastname: string,
    user_avatar: string,
    action_id: number,
    action: string
}

export const initialActionUserState: ActionUserState = {
    user_id: -1,
    user_email: '',
    user_firstname: '',
    user_lastname: '',
    user_avatar: userImg,
    action_id: -1,
    action: ''
}

export interface AllActionUsersState {
    users: [
        ActionUserState
    ]
}

export const initialActionAllUsersState: AllActionUsersState = {
    users: [initialActionUserState]
};

export interface ActionCompanyState {
    company_id: number,
    company_name: string,
    company_title: string,
    company_avatar: string,
    is_visible: boolean,
    action_id: number,
    action: string
}

export const initialActionCompanyState: ActionCompanyState = {
    company_id: -1,
    company_name: '',
    company_title: '',
    company_avatar: '',
    is_visible: true,
    action_id: -1,
    action: ''
}

export interface AllActionCompaniesState {
    companies: [
        ActionCompanyState
    ]
}

export const initialAllActionCompaniesState: AllActionCompaniesState = {
    companies: [initialActionCompanyState]
};

export interface CompanyItemProps {
    companyData: CompanyState;
}

export interface ModalProps {
    isOpen: boolean,
    toggle: () => void;
}

export interface CompanyProps {
    company_id: number;
}

export interface CurrentUserProps {
    currentUser: CurrentUserState;
}

export interface CheckModalProps {
    isOpen: boolean,
    toggle: () => void;
    action_id: number
    callback: () => void;
}

export interface UserProps {
    user_id: number;
}



