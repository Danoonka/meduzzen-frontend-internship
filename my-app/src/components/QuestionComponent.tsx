import React, {useState} from 'react';
import Input from "../utils/Input";
import Button from "../utils/Button";
import {InitialQuestionState} from "../types";

interface QuestionComponentProps {
    questionText: string;
    handleQuestionTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleAnswerChange: (question_index: number, answer_index: number, e: React.ChangeEvent<HTMLInputElement>) => void
    handleRadioChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
    answerArray: string[]
    question_index: number

}

const QuestionComponent = ({
                               questionText,
                               handleQuestionTextChange,
                               handleRadioChange, handleAnswerChange, answerArray, question_index,
                           }: QuestionComponentProps) => {
    const addAnswersFieldsDynamically = (arr :string[]) => {
        if (arr.length === InitialQuestionState.question_answers.length) {
            return [{radio: 0, question_answers: ''}, {radio: 1, question_answers: ''}]
        }else{
            let answerFields: {radio: number, question_answers: string}[] = []
            arr.forEach((el, index)=>{
                answerFields.push({radio: index, question_answers: el})
            })
            return answerFields
        }
    }
    const [inputFields, setInputFields] = useState(addAnswersFieldsDynamically(answerArray))

    const addAnswerFields = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        let newField = {radio: inputFields.length, question_answers: ''}
        setInputFields([...inputFields, newField])
    }

    const removeAnswerFields = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault()
        if (inputFields.length > 2) {
            let data = [...inputFields];
            data.splice(index, 1)
            setInputFields(data)
        }
    }
    const answers = inputFields.map((input, index) => {
        return (
            <div key={index} className="input-answer">
                <input
                    type="radio"
                    name='question_correct_answer'
                    value={input.radio}
                    onChange={(e) => handleRadioChange(question_index, e)}
                    required
                />
                <Input
                    name='question_answers'
                    value={answerArray[index] || ''}
                    onChange={(e) => handleAnswerChange(question_index, index, e)}
                    id='6' label="" type='answer' required
                />
                <Button onClick={(e) => removeAnswerFields(e, index)}>Remove</Button>
            </div>
        )
    })
    return (
        <form>
            <Input name='question_text' label='Question Text' value={questionText}
                   type='question_text' id='2'
                   onChange={(e) => handleQuestionTextChange(e)}/>
            {answers}
            <Button onClick={addAnswerFields}>Add Answer</Button>
        </form>
    );
};

export default QuestionComponent;