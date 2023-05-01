import React from 'react';
import {Link} from "react-router-dom";

interface  CompanyData{
    id: number;
    company_avatar: string;
    company_name: string;
    company_city: string;
}

interface CompanyItemProps {
    companyData: CompanyData;
}

const CompanyItem: React.FC<CompanyItemProps> = ({companyData}) => {

    return (
        <Link to='/companyProfile' state={{data: companyData.id}}>
            <div className="user-item-container">
                <img src={companyData.company_avatar} alt="company avatar"/>
                <div>
                    <h4>{companyData.company_name}</h4>
                    <p>Location: {companyData.company_city}</p>
                </div>
            </div>
        </Link>
    );
};

export default CompanyItem;