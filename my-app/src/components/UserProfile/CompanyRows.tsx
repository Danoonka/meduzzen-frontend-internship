import React, {ReactNode} from 'react';
import {ActionCompanyState, CompanyState} from "../../types";
import '../companyProfile/UserRows.css'
import {Link} from "react-router-dom";
import userAvatar from "../../assets/ffa09aec412db3f54deadf1b3781de2a.png";

interface CompanyItemProps {
    companyData: ActionCompanyState | CompanyState;
    children: ReactNode;
}

const CompanyRows: React.FC<CompanyItemProps> = ({companyData, children}: CompanyItemProps) => {

    return (

        <div className="user-row-container">
            <img
                className="user-row-container-img"
                src={companyData.company_avatar === null ? userAvatar : companyData.company_avatar}
                alt="company avatar"/>
            <div>
                <Link to='/companyProfile' state={{company_id: companyData.company_id}}>
                    <h4>{companyData.company_name}</h4>
                </Link>
            </div>
            <div>
                {children}
            </div>
        </div>

    );
};

export default CompanyRows;