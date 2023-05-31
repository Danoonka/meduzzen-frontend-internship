import React from 'react';
import QuestionComponent from "../QuestionComponent";
import Modal from "./Modal";
import Button from "../../utils/Button";
import {AddQuestionModalProps} from "../../types";


const EditQuestionModal = ({
                               toggle,
                               isOpen,
                               callback,
                               handleAnswerChange,
                               handleRadioChange,
                               handleQuestionTextChange,
                               question_id,
                               answerArray,
                               questionText,

                           }: AddQuestionModalProps) => {
    return (

        <Modal isOpen={isOpen} toggle={toggle} classNM='edit-question-modal-box'>
            <QuestionComponent answerArray={answerArray}
                               handleAnswerChange={handleAnswerChange}
                               handleQuestionTextChange={(e) => handleQuestionTextChange(e)}
                               handleRadioChange={handleRadioChange}
                               questionText={questionText}
                               question_index={question_id}

            />
            <Button onClick={() => {
                callback()
            }
            }>Save</Button>
        </Modal>
    );
};

export default EditQuestionModal;