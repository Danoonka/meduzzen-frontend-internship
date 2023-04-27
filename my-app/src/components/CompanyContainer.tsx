import React from 'react';

const CompanyContainer = (companyData: any) => {
    companyData = companyData.companyData
    return (
        <div className="user-profile-container">
            <img src={companyData.company_avatar} alt="company avatar"/>
            <div>
                <h2>{companyData.company_name}</h2>
                <p>Email: {companyData.company_email}</p>
                <p>Location: {companyData.company_city}</p>
                <p>Contacts: {companyData.company_phone}</p>
            </div>

        </div>
    );
};

export default CompanyContainer;