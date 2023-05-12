import React from 'react';
import {Link} from "react-router-dom";
import {CompanyState} from "../types";

interface CompanyItemProps {
    companyData: CompanyState;
}

const CompanyItem: React.FC<CompanyItemProps> = ({companyData} :CompanyItemProps) => {

    return (
        <Link to='/companyProfile' state={{company_id: companyData.company_id}}>
            <div className="user-item-container">
                <img src={companyData.company_avatar} alt="company avatar"/>
                <div>
                    <h4>{companyData.company_name}</h4>
                </div>
            </div>
        </Link>
    );
};

export default CompanyItem;