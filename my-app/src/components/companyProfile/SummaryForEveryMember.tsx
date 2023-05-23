import React, { useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import {
    getSummaryRatingAnalyticForUsersThunk,
    getSummaryRatingAnalyticForUserThunk, getUserByIdThunk,
} from '../../store/reduxThunk';
import {CompanyItemProps, RatingForUsersState, RatingState} from '../../types';
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
import { generateColors } from './CompanyProfileAnalytics';
import { Line } from 'react-chartjs-2';


const SummaryForEveryMember = ({ companyData }: CompanyItemProps) => {
    const [user, setUser] = React.useState('');
    const [ratingCompany, setRatingCompany] = useState<RatingState[]>([]);
    const [quizzes, setQuizzes] = useState<RatingForUsersState[]>([]);
    const [userNameArr, setUserNameArr] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setUser(event.target.value as string);
    };

    useEffect(() => {
        const userIDs = ratingCompany.map((entry) => entry.user_id);
        getUserNames(userIDs);
    }, [ratingCompany]);

    const getUserNames = async (userIds: number[]) => {
        const namePromises = userIds.map((id) =>
            getUserByIdThunk(id).then((res) => res.result.user_firstname + ' ' + res.result.user_lastname)
        );
        const names = await Promise.all(namePromises);
        setUserNameArr(names);
    };

    useEffect(() => {
        getSummaryRatingAnalyticForUsersThunk(companyData.company_id).then((res) => {
            setRatingCompany(res.result.rating);
        });
    }, [companyData.company_id]);

    useEffect(() => {
        if (user) {
            const userId = parseInt(user);
            getSummaryRatingAnalyticForUserThunk(companyData.company_id, userId).then((res) => {
                setQuizzes(res.result.rating);
            });
        }
    }, [companyData.company_id, user]);

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Summary Rating for every user',
            },
        },
    };

    const uniqueQuizIds = Array.from(new Set(quizzes.map((entry) => entry.quiz_id)));
    const colors = generateColors(uniqueQuizIds.length);

    const passAtValues = quizzes.map((entry) => entry.rating.map((item) => item.pass_at)).flat();

    const labels = passAtValues.map((passAt) => {
        const date = new Date(passAt);
        return date.toLocaleString('default', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    });

    const datasets = quizzes.map((entry, index) => ({
        label: `Quiz ID: ${entry.quiz_id}`,
        data: entry.rating.map((item) => item.average_rating),
        borderColor: colors[index],
        backgroundColor: colors[index],
    }));

    const data = {
        labels,
        datasets,
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
        const userId = event.currentTarget.getAttribute('data-value');
        if (userId) {
            setUser(userId);
        }
    };

    return (
        <div>
            <Box sx={{ minWidth: 120,  mt: 5 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">User</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="User"
                        onChange={handleChange}
                    >
                        {ratingCompany.map((item, index) => {
                            return (
                                <MenuItem value={item.user_id} key={index} onClick={handleMenuItemClick}>
                                    {userNameArr[index]}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Line options={options} data={data} />
        </div>
    );
};

export default SummaryForEveryMember;
