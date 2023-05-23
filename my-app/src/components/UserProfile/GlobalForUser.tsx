import React, {useEffect, useState} from 'react';
import {Rating, UserProps} from "../../types";
import {getGlobalRatingAnalyticThunk} from "../../store/reduxThunk";
import Chart from "../../utils/Chart";


const GlobalForUser = ({user_id}: UserProps) => {
    const [ratingCompany, setRatingCompany] = useState<Rating[]>([]);

    useEffect(() => {
        getGlobalRatingAnalyticThunk(user_id)
            .then((res) => {
                setRatingCompany(res.result.rating);
            });
    }, []);


    return (
        <div>
            <Chart rating={ratingCompany} chartName="Global Rating for User"/>
        </div>
    );
};

export default GlobalForUser;