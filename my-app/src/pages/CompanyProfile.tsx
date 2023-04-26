import React from 'react';
import {useLocation} from "react-router-dom";

const CompanyProfile = () => {
    const location = useLocation()
    const {data} = location.state

    return (
        <div>
            <img src={data.company_avatar} alt="company avatar"/>
            <h2>{data.company_name}</h2>
            <p>{data.company_email}</p>
            <p>{data.company_city}</p>
            <p>{data.company_phone}</p>
        </div>
    );
};

export default CompanyProfile;