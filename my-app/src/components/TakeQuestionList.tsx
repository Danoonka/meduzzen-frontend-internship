import React from 'react';
import {QuestionState} from "../types";
import TakeAnswerList from "./TakeAnswerList";

interface TakeQuestionList {
    item: QuestionState,
    index: number,
    handleRadioChange: (index: number, el: string) => void
}


const TakeQuestionList = ({item, index, handleRadioChange}: TakeQuestionList) => {
    return (
        <div>
            <div className='question-component-container'>
                <h3>{item.question_text}</h3>
                <form>
                    {item.question_answers.map((el, id) => {
                        return <TakeAnswerList el={el}
                                               handleRadioChange={handleRadioChange}
                                               id={id}
                                               index={index}
                                               item={item}/>})}
                </form>
            </div>
        </div>
    );
};

export default TakeQuestionList;