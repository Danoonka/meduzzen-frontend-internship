import React from 'react';

interface CompanyData {
    company_avatar: string;
    company_name: string;
    company_email: string;
    company_city: string;
    company_phone: string;
}

interface CompanyContainerProps {
    companyData: CompanyData;
}

const CompanyContainer: React.FC<CompanyContainerProps> = ({ companyData }) => {
    return (
        <div className="user-profile-container">
            <img src={companyData.company_avatar} alt="company avatar" />
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