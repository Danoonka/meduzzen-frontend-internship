import React from 'react';
import Modal from "./Modal";
import QuestionComponent from "../QuestionComponent";
import Button from "../../utils/Button";
import {AddQuestionModalProps} from "../../types";


const AddQuestionModal = ({
                              isOpen,
                              toggle,
                              callback,
                              questionText,
                              handleQuestionTextChange,
                              handleRadioChange,
                              handleAnswerChange,
                              answerArray,
                              question_id
                          }: AddQuestionModalProps) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} classNM='edit-question-modal-box'>
            <QuestionComponent questionText={questionText}
                               handleQuestionTextChange={(e) => handleQuestionTextChange(e)}
                               handleAnswerChange={handleAnswerChange}
                               handleRadioChange={handleRadioChange}
                               answerArray={answerArray}
                               question_index={question_id}/>
            <Button onClick={() => {
                callback()
            }
            }>Save</Button>
        </Modal>
    );
};

export default AddQuestionModal;