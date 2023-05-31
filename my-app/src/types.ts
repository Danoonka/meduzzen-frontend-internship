import userImg from './assets/ffa09aec412db3f54deadf1b3781de2a.png'
import React from "react";

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
    isPermission?: boolean
}

export interface ModalProps {
    isOpen: boolean,
    toggle: () => void;
    className?: string;
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
    callback: () => void;
    company_id?: number;
    quiz_id?: number;
    user_id?:number
}

export interface UserProps {
    user_id: number;
}

export interface QuizForListState {
    quiz_id: number,
    quiz_name: string,
    quiz_title: string,
    quiz_description: string,
}

export const initialQuizForListState: QuizForListState = {
    quiz_id: -1,
    quiz_name: '',
    quiz_title: '',
    quiz_description: '',
}

export interface AllQuizForListState {
    quizzes: [
        QuizForListState
    ]
}

export const initialAllQuizForListState: AllQuizForListState = {
    quizzes: [
        initialQuizForListState
    ]
}

export interface QuestionState {
    question_id: number,
    question_text: string,
    question_answers: string[],
    question_correct_answer: number
}

export const InitialQuestionState: QuestionState = {
    question_id: -1,
    question_text: '',
    question_answers: [''],
    question_correct_answer: -1
}


export interface GetQuizByIdState {
    quiz_id: number,
    quiz_name: string,
    quiz_title: string,
    quiz_description: string,
    quiz_frequency: number,
    created_by: CurrentUserState,
    questions_list: QuestionState[]
}

export const initialGetQuizByIdState: GetQuizByIdState = {
    quiz_id: -1,
    quiz_name: '',
    quiz_title: '',
    quiz_description: '',
    quiz_frequency: 0,
    created_by: initialCurrentUserState,
    questions_list: [InitialQuestionState]
}


export interface NewQuizState {
    quiz_name: string,
    quiz_frequency: number,
    company_id: number,
    questions_list: QuestionState[]
}

export const initialNewQuizState: NewQuizState = {
    quiz_name: '',
    quiz_frequency: 0,
    company_id: -1,
    questions_list: []
}

export interface EditQuizState {
    quiz_name: string,
    quiz_title: string,
    quiz_description: string,
    quiz_frequency: number
}

export const initialEditQuizState: EditQuizState = {
    quiz_name: '',
    quiz_title: '',
    quiz_description: '',
    quiz_frequency: 0
}

export interface EditQuestionState {
    question_id: number,
    question_text: string,
    question_answers: string[],
    question_correct_answer: number
}

export const initialEditQuestionState: EditQuestionState = {
    question_id: -1,
    question_text: '',
    question_answers: [''],
    question_correct_answer: -1
}

export interface AddQuestionModalProps {
    isOpen: boolean
    toggle: () => void;
    callback: () => void;
    questionText: string;
    handleQuestionTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleAnswerChange: (question_index: number, answer_index: number, e: React.ChangeEvent<HTMLInputElement>) => void
    handleRadioChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
    answerArray: string[],
    question_id: number
}

export interface Rating {
    current_rating: number;
    average_rating: number;
    pass_at: string;
}

export interface RatingState {
    rating: Rating[];
    user_id: number;
}

export interface RatingForUsersState {
    rating: Rating[];
    quiz_id: number;
}

export interface quiz {
    quiz_id: number,
    last_quiz_pass_at: string
}








