import React, {useState} from 'react';
import Modal from "./Modal";
import {
    CheckModalProps,
    initialNewQuizState,
    NewQuizState,
    QuestionState
} from "../../types";
import Input from "../../utils/Input";
import QuestionComponent from "../QuestionComponent";
import './CreateQuizeModal.css'
import Button from "../../utils/Button";
import {createQuizThunk} from "../../store/reduxThunk";
import {toast} from "react-toastify";
import {ValidateForm} from "../../utils/quizValidation";


const CreateQuizModal = ({toggle, isOpen, callback, company_id}: CheckModalProps) => {
    const [quiz, setQuiz] = useState<NewQuizState>(initialNewQuizState)
    const [questionTextFields, setQuestionTextFields] = useState([{
        question_text: '',
        question_answers: [''],
        question_correct_answer: -1
    }, {
        question_text: '',
        question_answers: [''],
        question_correct_answer: -1
    }])
    const Arr: QuestionState[] = [];

    const handleQuestionTextChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let data = [...questionTextFields];
        data[index]['question_text'] = event.target.value;
        setQuestionTextFields(data);
    }

    const handleAnswerChange = (question_index: number, answer_index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionTextFields(prevFields => {
            const updatedFields = [...prevFields];
            updatedFields[question_index].question_answers[answer_index] = event.target.value
            return updatedFields;
        });
    }

    const handleRadioChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let data = [...questionTextFields];
        data[index]['question_correct_answer'] = Number(event.target.value);
        setQuestionTextFields(data);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuiz({...quiz, [event.target.name]: value});
    }


    const addFields = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setQuestionTextFields([...questionTextFields, {
            question_text: '',
            question_answers: [''],
            question_correct_answer: -1
        }])
    }


    const clearForm = () => {
        setQuiz(initialNewQuizState);
        setQuestionTextFields([
            {
                question_text: '',
                question_answers: [''],
                question_correct_answer: -1,
            },
            {
                question_text: '',
                question_answers: [''],
                question_correct_answer: -1,
            },
        ])
    }

    const removeFields = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault()
        if (questionTextFields.length > 2) {
            let data = [...questionTextFields];
            data.splice(index, 1)
            setQuestionTextFields(data)
        }
    }

    const onClickSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        questionTextFields.map((el, index) => {
            let newQuestion: QuestionState = {
                question_id: index, question_text: el.question_text,
                question_correct_answer: el.question_correct_answer, question_answers: el.question_answers
            }
            Arr.push(newQuestion)
        })
        let localQuiz: NewQuizState = {
            quiz_name: quiz.quiz_name,
            quiz_frequency: Number(quiz.quiz_frequency),
            questions_list: Arr,
            company_id: company_id ? company_id : -1
        }
        if (company_id) {
            if (ValidateForm(localQuiz)) {
                createQuizThunk(localQuiz)
                    .then(() => {
                        callback()
                        clearForm()
                        toggle()
                    })
            } else {
                toast.error('Invalid data!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
    }

    const createQuizFields = [
        {
            label: 'Quiz Name',
            name: 'quiz_name',
            id: '0',
            value: quiz.quiz_name,
            fun: handleInputChange,
            type: 'text'
        },
        {
            label: 'Quiz frequency',
            name: 'quiz_frequency',
            id: '1',
            value: quiz.quiz_frequency.toString(),
            fun: handleInputChange,
            type: 'number'
        }
    ]

    const fields = createQuizFields.map((item) => (
        <Input
            name={item.name}
            key={item.id}
            label={item.label}
            value={item.value}
            onChange={item.fun}
            id={item.id}
            type={item.type}
            required
        />
    ));

    const questions = questionTextFields.map((item, index) => {
        return (
            <div className="question-component-container" key={index}>
                <QuestionComponent questionText={item.question_text}
                                   answerArray={item.question_answers}
                                   handleQuestionTextChange={(e) => handleQuestionTextChange(index, e)}
                                   handleAnswerChange={handleAnswerChange}
                                   handleRadioChange={handleRadioChange}
                                   question_index={index}/>
                <Button onClick={(e) => removeFields(e, index)}
                        className="universal-button button-remove-q">Remove Question</Button>
            </div>
        )
    })

    return (
        <Modal isOpen={isOpen} toggle={toggle} classNM="create-quiz-modal-box">
            <h2>Create Quiz</h2>
            {fields}
            {questions}
            <Button onClick={addFields}>Add Question</Button>
            <Button className='universal-button button-submit' onClick={onClickSubmit}>Submit</Button>
        </Modal>
    );
};

export default CreateQuizModal;