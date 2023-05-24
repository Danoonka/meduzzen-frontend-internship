import React, {ReactNode, useEffect, useState} from 'react';
import {ActionUserState, CurrentUserState} from "../../types";
import './UserRows.css'
import userAvatar from '../../assets/ffa09aec412db3f54deadf1b3781de2a.png'
import {quizzesLastPassCompanyThunk} from "../../store/reduxThunk";

interface CurrentUserProps {
    currentUser: ActionUserState | CurrentUserState;
    children: ReactNode;
    isPermission?: boolean
    company_id?:number
    index?: number
}

interface quiz {
    quiz_id: number,
    last_quiz_pass_at: string
}

interface User {
    user_id: number,
    quizzes: quiz[]
}

const UserRows = ({currentUser, children, isPermission, company_id, index}: CurrentUserProps) => {
    const [lastPass, setLastPass] =  useState<quiz>()
    useEffect(()=>{
        quizzesLastPassCompanyThunk(company_id? company_id: -1)
            .then(res => {
                const user = res.result.users.find((user: User) => user.user_id === currentUser.user_id);

                if (user && user.quizzes.length > 0) {
                    const lastQuiz = user.quizzes.reduce((prevQuiz:quiz, currentQuiz:quiz) => {
                        if (!prevQuiz || new Date(currentQuiz.last_quiz_pass_at) > new Date(prevQuiz.last_quiz_pass_at)) {
                            return currentQuiz;
                        }
                        return prevQuiz;
                    }, null);

                    setLastPass(lastQuiz);
                }
            })
    }, [company_id, currentUser.user_id])


    return (
        <div className="user-row-container">
            <img className="user-row-container-img"
                 src={currentUser.user_avatar === null ? userAvatar : currentUser.user_avatar} alt="user avatar"/>
            <div>
                <h4 className='user-row-container-heading'>{currentUser.user_firstname} {currentUser.user_lastname}</h4>
                {isPermission &&
                    <p className='data-time'>Last pass: {lastPass
                        ? new Date(lastPass.last_quiz_pass_at).toLocaleString()
                        : 'No attempt'}</p>
                }
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default UserRows;