import React, {useEffect, useState} from 'react';
import {Rating, UserProps, quiz} from "../../types";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {
    getQuizByIdThunk,
    getRatingAnalyticsForQuizThunk,
    quizzesLastPassThunk
} from "../../store/reduxThunk";
import Chart from "../../utils/Chart";


const QuizzesForUser = ({user_id}: UserProps) => {
    const [quiz, setQuiz] = React.useState('');
    const [ratingQuiz, setRatingQuiz] = useState<quiz[]>([]);
    const [rating, setRating] = useState<Rating[]>([])
    const [quizNameArr, setQuizNameArr] = useState<string[]>([]);


    const handleChange = (event: SelectChangeEvent) => {
        setQuiz(event.target.value as string);
    };

    useEffect(() => {
        const quizIDs = ratingQuiz.map((entry) => entry.quiz_id);
        getQuizNames(quizIDs);
    }, [ratingQuiz]);

    const getQuizNames = async (companyIDs: number[]) => {
        const namePromises = companyIDs.map((id) =>
            getQuizByIdThunk(id).then((res) => res?.result.quiz_name)
        );
        const names = await Promise.all(namePromises);
        setQuizNameArr(names);
    };

    const stringsfied = JSON.stringify(ratingQuiz)

    useEffect(() => {
        quizzesLastPassThunk(user_id)
            .then(res => setRatingQuiz(res?.result.quizzes))
    }, [stringsfied, user_id]);


    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
        const quiz_id = event.currentTarget.getAttribute('data-value')
        getRatingAnalyticsForQuizThunk(user_id, Number(quiz_id))
            .then(res => setRating(res?.result.rating))
    }


    return (
        <div>
            <Box sx={{minWidth: 120,  mt: 5}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Quiz</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={quiz}
                        label="User"
                        onChange={handleChange}
                    >
                        {ratingQuiz.map((item, index) => {
                            return (
                                <MenuItem value={item.quiz_id} key={index}
                                          onClick={handleMenuItemClick}>{quizNameArr[index]}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Chart rating={rating} chartName="Rating for user by quizzes"/>
        </div>
    );
};

export default QuizzesForUser;