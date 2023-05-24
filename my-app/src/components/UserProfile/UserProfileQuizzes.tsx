import React, {useEffect, useState} from 'react';
import {quiz, UserProps} from "../../types";
import {getQuizByIdThunk, quizzesLastPassThunk} from "../../store/reduxThunk";
import QuestionRows from "../companyProfile/questionRows";


const UserProfileQuizzes = ({user_id}: UserProps) => {
    const [quizNameArr, setQuizNameArr] = useState<string[]>([]);
    const [quizList, setQuizList] = useState<quiz[]>([])
    useEffect(() => {
        quizzesLastPassThunk(user_id)
            .then(res => {
                setQuizList(res?.result.quizzes)
            })
    }, [user_id])

    const getQuizNames = async (quizIDs: number[]) => {
        const namePromises = quizIDs.map((id) =>
            getQuizByIdThunk(id).then(res => res?.result.quiz_name)
        );
        const names = await Promise.all(namePromises);
        setQuizNameArr(names);
    };

    useEffect(() => {
        const quizIDs = quizList.map((entry) => entry.quiz_id);
        getQuizNames(quizIDs);
    }, [quizList]);

    const quizzes = quizList.map((item: quiz, index: number) => {
        return (
            <QuestionRows
                key={index}
                heading={(quizNameArr[index])}
                children={
                    <p className='data-time'>{new Date(item.last_quiz_pass_at).toLocaleString()}</p>
                }
            />
        )
    })

    return (
        <>
            {quizzes}
        </>
    );
};

export default UserProfileQuizzes;