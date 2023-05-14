import React from 'react';
import {Link} from "react-router-dom";
import {CompanyItemProps} from "../types";
import userAvatar from "../assets/ffa09aec412db3f54deadf1b3781de2a.png";


const CompanyItem = ({companyData}: CompanyItemProps) => {

    return (
        <Link to='/companyProfile' state={{company_id: companyData.company_id}}>
            <div className="user-item-container">
                <img src={companyData.company_avatar === null ? userAvatar : companyData.company_avatar}
                     alt="company avatar"/>
                <div>
                    <h4>{companyData.company_name}</h4>
                </div>
            </div>
        </Link>
    );
};

export default CompanyItem;