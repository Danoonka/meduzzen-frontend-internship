import React, {useEffect, useState} from 'react';
import {
    CheckModalProps, EditQuestionState,
    EditQuizState,
    initialEditQuestionState,
    initialEditQuizState,
    InitialQuestionState,
    QuestionState
} from "../../types";
import Modal from "./Modal";
import Input from "../../utils/Input";
import {
    addQuestionForQuizThunk,
    deleteQuestionThunk,
    getQuizByIdThunk,
    updateQuestionThunk,
    updateQuizThunk
} from "../../store/reduxThunk";
import Button from "../../utils/Button";
import QuestionRows from "../companyProfile/questionRows";
import EditQuestionModal from "./EditQuestionModal";
import './CreateQuizeModal.css'
import AddQuestionModal from "./AddQuestionModal";
import {toast} from "react-toastify";
import {infoFieldsValidation, questionFieldsValidation} from "../../utils/quizValidation";


const EditQuizModal = ({toggle, isOpen, callback, quiz_id}: CheckModalProps,) => {
    const [quiz, setQuiz] = useState<EditQuizState>(initialEditQuizState)
    const [quizQuestion, setQuizQuestion] = useState<QuestionState[]>([InitialQuestionState])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false)
    const [questionTextFields, setQuestionFields] = useState<EditQuestionState>(initialEditQuestionState)

    useEffect(() => {
        if (quiz_id) {
            getQuizByIdThunk(quiz_id)
                .then(res => {
                    setQuiz(res.result)
                    setQuizQuestion(res.result.questions_list)
                })
        }
    }, [quiz_id, quizQuestion.length])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuiz({...quiz, [event.target.name]: event.target.value})
    }

    const handleAnswerChange = (question_index: number, answer_index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let data = questionTextFields.question_answers
        data[answer_index] = event.target.value
        setQuestionFields({...questionTextFields, question_answers: data})
    }

    const handleRadioChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionFields({...questionTextFields, question_correct_answer: Number(event.target.value)});
    }

    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionFields({...questionTextFields, question_text: event.target.value});
    }

    const onClickUpdateInfo = (quiz_id: number, quiz: EditQuizState) => {
        if (infoFieldsValidation(quiz)) {
            updateQuizThunk(quiz_id, quiz)
        } else {
            toast.error('Invalid data!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const onClickEditQuestion = (questionTextFields: EditQuestionState) => {
        setQuestionFields(questionTextFields)
        setIsEditModalOpen(!isEditModalOpen)
    }

    const onClickAddQuestion = (questionTextFields: EditQuestionState) => {
        setQuestionFields(questionTextFields)
        setIsAddQuestionOpen(!isAddQuestionOpen)
    }


    const reloadQuestionList = () => {
        getQuizByIdThunk(quiz_id ? quiz_id : -1)
            .then(res => {
                setQuizQuestion(res.result.questions_list)
            })
    }

    const onClickDelete = (question_id: number) => {
        deleteQuestionThunk(question_id)
            .then(() => {
                reloadQuestionList()
            })
    }

    const onCallBack = () => {
        if (questionFieldsValidation(questionTextFields)) {
            updateQuestionThunk(questionTextFields.question_id, questionTextFields)
                .then(() => {
                    reloadQuestionList()
                    setIsEditModalOpen(!isEditModalOpen)
                })
        } else {
            toast.error('Invalid data!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const onClickSaveNewQuestion = () => {
        if (questionFieldsValidation(questionTextFields)) {
            addQuestionForQuizThunk(questionTextFields, quiz_id ? quiz_id : -1)
                .then(() => {
                    reloadQuestionList()
                    setIsAddQuestionOpen(!isAddQuestionOpen)
                })
        } else {
            toast.error('Invalid data!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const editQuizFields = [
        {
            label: 'Quiz Name',
            name: 'quiz_name',
            id: '0',
            value: quiz.quiz_name,
            fun: handleInputChange,
            type: 'text'
        },
        {
            label: 'Quiz Title',
            name: 'quiz_title',
            id: '1',
            value: quiz.quiz_title,
            fun: handleInputChange,
            type: 'text'
        },
        {
            label: 'Quiz Description',
            name: 'quiz_description',
            id: '2',
            value: quiz.quiz_description,
            fun: handleInputChange,
            type: 'text'
        },
        {
            label: 'Quiz frequency',
            name: 'quiz_frequency',
            id: '3',
            value: quiz.quiz_frequency.toString(),
            fun: handleInputChange,
            type: 'number'
        }
    ]

    const fields = editQuizFields.map((item) => (
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

    const questions = quizQuestion.map((item, index) => {
        return (
            <QuestionRows
                heading={item.question_text}
                key={index}
                children=
                    {<>
                        <Button
                            onClick={() => onClickEditQuestion({
                                question_text: item.question_text,
                                question_answers: item.question_answers,
                                question_correct_answer: item.question_correct_answer,
                                question_id: item.question_id
                            })}>Edit</Button>
                        <Button onClick={() => onClickDelete(item.question_id)}>Delete</Button>
                    </>}/>)
    })

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} classNM="edit-quiz-modal-box">
                <h2>Edit Quiz</h2>
                {fields}
                <Button onClick={() => onClickUpdateInfo(quiz_id ? quiz_id : -1, quiz)}>Update Info</Button>
                <h2>Edit questions</h2>
                {questions}
                <Button onClick={() => onClickAddQuestion({
                    question_text: initialEditQuestionState.question_text,
                    question_answers: initialEditQuestionState.question_answers,
                    question_correct_answer: initialEditQuestionState.question_correct_answer,
                    question_id: quizQuestion.length
                })}>Add question</Button>
                <Button onClick={() => {
                    callback()
                    toggle()
                }}>Save</Button>
            </Modal>
            <EditQuestionModal
                toggle={() => setIsEditModalOpen(!isEditModalOpen)}
                isOpen={isEditModalOpen}
                callback={() => onCallBack()}
                handleAnswerChange={handleAnswerChange}
                handleRadioChange={handleRadioChange}
                handleQuestionTextChange={(e) => handleQuestionTextChange(e)}
                question_id={questionTextFields.question_id}
                answerArray={questionTextFields.question_answers}
                questionText={questionTextFields.question_text}
            />
            <AddQuestionModal
                toggle={() => setIsAddQuestionOpen(!isAddQuestionOpen)}
                isOpen={isAddQuestionOpen}
                callback={() => onClickSaveNewQuestion()}
                handleAnswerChange={handleAnswerChange}
                handleQuestionTextChange={(e) => handleQuestionTextChange(e)}
                handleRadioChange={handleRadioChange}
                answerArray={questionTextFields.question_answers}
                questionText={questionTextFields.question_text}
                question_id={questionTextFields.question_id}/>
        </div>
    );
};

export default EditQuizModal;