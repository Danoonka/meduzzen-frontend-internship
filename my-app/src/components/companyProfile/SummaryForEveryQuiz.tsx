import React, {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {
    getQuizByIdThunk,
    getQuizListThunk, getSummaryRatingAnalyticForQuizThunk,
} from "../../store/reduxThunk";
import {CompanyItemProps, RatingForUsersState, RatingState} from "../../types";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    ChartOptions,
} from 'chart.js';
import {generateColors} from "./CompanyProfileAnalytics";
import {Line} from "react-chartjs-2";


const SummaryForEveryQuiz = ({companyData}: CompanyItemProps) => {
    const [quiz, setQuiz] = React.useState('');
    const [ratingCompany, setRatingCompany] = useState<RatingForUsersState[]>([]);
    const [users, setUsers] = useState<RatingState[]>([])
    const [quizNameArr, setQuizNameArr] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setQuiz(event.target.value as string);
    };

    useEffect(() => {
        getQuizListThunk(companyData.company_id).then((res) => {
            setRatingCompany(res?.data.result.quizzes);
        });
    }, [JSON.stringify(ratingCompany)]);

    useEffect(() => {
        const quizIDs = ratingCompany.map((entry) => entry.quiz_id);
        getQuizNames(quizIDs);
    }, [ratingCompany]);

    const getQuizNames = async (companyIDs: number[]) => {
        const namePromises = companyIDs.map((id) =>
            getQuizByIdThunk(id).then((res) => res?.data.result.quiz_name)
        );
        const names = await Promise.all(namePromises);
        setQuizNameArr(names);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
        const quiz_id = event.currentTarget.getAttribute('data-value')
        getSummaryRatingAnalyticForQuizThunk(companyData.company_id, Number(quiz_id))
            .then(res => setUsers(res?.data.result.rating))
    }
    const uniqueUserIds = Array.from(new Set(users.map(entry => entry.user_id)));
    const colors = generateColors(uniqueUserIds.length);

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Summary Rating for every quiz',
            },
        },
    };

    const passAtValues = users.map(entry => entry.rating.map(item => item.pass_at)).flat();
    const labels = passAtValues.map(passAt => {
        const date = new Date(passAt);
        return date.toLocaleString('default', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
    });

    const datasets = users.map((entry, index) => ({
        label: `User ID: ${entry.user_id}`,
        data: entry.rating.map(item => item.average_rating),
        borderColor: colors[index],
        backgroundColor: colors[index],
    }));

    const data = {
        labels,
        datasets,
    };

    return (
        <div>
            <Box sx={{minWidth: 120, mt: 5}} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Quiz</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={quiz}
                        label="Quiz"
                        onChange={handleChange}
                    >
                        {ratingCompany.map((item, index) => {
                            return (
                                <MenuItem value={item.quiz_id} key={index}
                                          onClick={handleMenuItemClick}>{quizNameArr[index]}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Line options={options} data={data}/>
        </div>
    );
};

export default SummaryForEveryQuiz;