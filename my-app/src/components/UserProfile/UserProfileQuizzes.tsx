import React, {useEffect, useState} from 'react';
import {quiz, UserProps} from "../../types";
import {getUserByIdThunk, quizzesLastPassThunk} from "../../store/reduxThunk";
import QuestionRows from "../companyProfile/questionRows";
import {getQuizById} from "../../api/api";


const UserProfileQuizzes = ({user_id}: UserProps) => {
    const [quizNameArr, setQuizNameArr] = useState<string[]>([]);
    const [quizList, setQuizList] = useState<quiz[]>([{
        quiz_id: -1,
        last_quiz_pass_at: "2001-01-01T00:00:01"
    }])
    useEffect(() => {
        quizzesLastPassThunk(user_id)
            .then(res => {
                setQuizList(res?.data.result.quizzes)
            })
    }, [user_id])

    const getQuizNames = async (quizIDs: number[]) => {
        const namePromises = quizIDs.map((id) =>
            getQuizById(id).then((res) => res?.data.result.quiz_name)
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
                    <p className='data-time'>{(item.last_quiz_pass_at === "2001-01-01T00:00:01")
                        ? 'No attempt' : new Date(item.last_quiz_pass_at).toLocaleString()}</p>}/>)
    })

    return (
        <>
            {quizzes}
        </>
    );
};

export default UserProfileQuizzes;