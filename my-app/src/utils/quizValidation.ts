import {EditQuestionState, EditQuizState, NewQuizState} from "../types";

export const questionFieldsValidation = (question: EditQuestionState): boolean => {
    let isValid = true;
    if (question.question_text === '') {
        isValid = false;
        return false;
    }
    if (question.question_correct_answer === -1 || question.question_correct_answer === undefined) {
        isValid = false;
        return false;
    }
    if (question.question_answers.length < 2) {
        isValid = false;
        return false;
    }
    question.question_answers.forEach(el => {
        if (el === '') {
            isValid = false;
            return false;
        }
    });
    return isValid;
}

export const infoFieldsValidation = (quiz: EditQuizState) => {
    if (quiz.quiz_name === '') {
        return false
    }
    if (Number(quiz.quiz_frequency) === 0 || isNaN(quiz.quiz_frequency)) {
        return false
    }
    return true
}


export const ValidateQuestions = (quiz: NewQuizState): boolean => {
    let isValid = true;
    quiz.questions_list.forEach(item => {
        isValid = questionFieldsValidation(item);
    });
    return isValid;
};

export const ValidateForm = (quiz: NewQuizState) => {
    if (quiz.quiz_name === '') {
        return false
    }
    if (Number(quiz.quiz_frequency) === 0 || isNaN(quiz.quiz_frequency)) {
        return false
    }
    if (quiz.questions_list.length < 2) {
        return false
    }
    if (!ValidateQuestions(quiz)) {
        return false
    }
    return true
}