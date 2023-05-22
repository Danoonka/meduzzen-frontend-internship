import React, {useEffect, useState} from 'react';
import {getSummaryRatingAnalyticForUsersThunk, getUserByIdThunk} from '../../store/reduxThunk';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {generateColors} from './CompanyProfileAnalytics';
import {CompanyItemProps, RatingState} from '../../types';


const SummaryForCompany = ({companyData}: CompanyItemProps) => {
    const [ratingCompany, setRatingCompany] = useState<RatingState[]>([]);
    const [userNameArr, setUserNameArr] = useState<string[]>([]);

    useEffect(() => {
        getSummaryRatingAnalyticForUsersThunk(companyData.company_id).then((res) => {
            setRatingCompany(res.result.rating);
        });
    }, [companyData.company_id]);

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

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Summary Rating for Users',
            },
        },
    };

    const uniqueUserIds = Array.from(new Set(ratingCompany.map((entry) => entry.user_id)));
    const colors = generateColors(uniqueUserIds.length);

    const passAtValues = ratingCompany.map((entry) => entry.rating.map((item) => item.pass_at)).flat();

    const labels = passAtValues.map((passAt) => {
        const date = new Date(passAt);
        return date.toLocaleString('default', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
    });

    const datasets = ratingCompany.map((entry, index) => ({
        label: `User: ${userNameArr[index]}`,
        data: entry.rating.map((item) => item.average_rating),
        borderColor: colors[index],
        backgroundColor: colors[index],
    }));

    const data = {
        labels,
        datasets,
    };

    return (
        <div>
            <Line options={options} data={data}/>
        </div>
    );
};

export default SummaryForCompany;
