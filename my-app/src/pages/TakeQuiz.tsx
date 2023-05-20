import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {GetQuizByIdState, initialGetQuizByIdState} from "../types";
import {getQuizByIdThunk, takeQuizThunk} from "../store/reduxThunk";
import Button from "../utils/Button";
import '../components/modalWindows/CreateQuizeModal.css'
import TakeQuestionList from "../components/TakeQuestionList";

const TakeQuiz = () => {
    const {quiz_id} = useLocation().state
    const [quiz, setQuiz] = useState<GetQuizByIdState>(initialGetQuizByIdState)
    const [answers, setAnswers] = useState<{ [key: string]: string }>();
    const navigate = useNavigate()
    useEffect(() => {
        if (quiz_id) {
            getQuizByIdThunk(quiz_id)
                .then(res => {
                    setQuiz(res?.data.result)
                })
        }
    }, [JSON.stringify(quiz), quiz_id])

    const addAnswer = (index: string, el: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [index]: el,
        }));
    };


    const handleRadioChange = (index: number, el: string) => {
        addAnswer(index.toString(), el);
    }

    const onClickSubmit = () => {
        takeQuizThunk(quiz_id, answers ? answers : {}).then(() => {
            navigate(-1)
        });
    }

    return (
        <div className='take-quiz-container'>
            <h2>{quiz.quiz_name}</h2>
            <h2>{quiz.quiz_title}</h2>
            <p>{quiz.quiz_description}</p>
            {quiz.questions_list.map((item, index) =>
                <TakeQuestionList handleRadioChange={handleRadioChange} index={index} item={item}/>
            )}
            <Button onClick={() => onClickSubmit()}>Submit</Button>
        </div>
    );
};

export default TakeQuiz;