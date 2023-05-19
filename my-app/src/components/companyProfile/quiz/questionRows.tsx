import React, {ReactNode} from 'react';
import {QuestionState} from "../../../types";

interface QuestionRowsProps {
    question: QuestionState;
    children: ReactNode;
}

const QuestionRows = ({question, children}: QuestionRowsProps) => {
    return (
        <div className="user-row-container">
            <div>
                <h4 className='user-row-container-heading'>{question.question_text}</h4>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default QuestionRows;