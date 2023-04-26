import React from 'react';
import {useLocation} from "react-router-dom";

const CompanyProfile = () => {
    const location = useLocation()
    const {data} = location.state

    return (
        <div className="user-profile-container">
            <img src={data.company_avatar} alt="company avatar"/>
            <div>
                <h2>{data.company_name}</h2>
                <p>Email: {data.company_email}</p>
                <p>Location: {data.company_city}</p>
                <p>Contacts: {data.company_phone}</p>
            </div>

        </div>
    );
};

export default CompanyProfile;