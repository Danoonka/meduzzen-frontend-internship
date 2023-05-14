import React from 'react';
import {useLocation} from "react-router-dom";
import CompanyContainer from "../components/companyProfile/CompanyContainer";


const CompanyProfile = () => {

    const {company_id: stateCompanyId} = useLocation().state
    return (
        <>
            <CompanyContainer company_id={stateCompanyId}/>
        </>

    );
};

export default CompanyProfile;