import React from 'react';
import {QuestionState} from "../types";

interface TakeAnswerListProps {
    item: QuestionState,
    el: string,
    id: number,
    index: number,
    handleRadioChange: (index:number,el:string) => void
}

const TakeAnswerList = ({item, el, id, handleRadioChange, index}:TakeAnswerListProps) => {
    return (
        <div key={index} className="input-answer">
            <input
                type="radio"
                name='question_correct_answer'
                value={id}
                onChange={() => handleRadioChange(item.question_id, el)}
            />
            <p>{el}</p>
        </div>
    );
};

export default TakeAnswerList;