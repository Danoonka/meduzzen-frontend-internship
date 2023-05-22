import React, {ReactNode} from 'react';
import {QuizForListState} from "../../../types";

interface QuizRowsProps {
    quiz: QuizForListState;
    children: ReactNode;
}

const QuizRows = ({quiz, children}: QuizRowsProps) => {
    return (
        <div className="user-row-container">
            <div>
                <h4 className='user-row-container-heading'>{quiz.quiz_name}</h4>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default QuizRows;