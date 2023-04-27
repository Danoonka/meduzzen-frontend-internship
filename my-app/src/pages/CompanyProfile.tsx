import React from 'react';
import {useLocation} from "react-router-dom";
import aboutPageCompanyImg from "../assets/about-page-company-img.png";
import CompanyContainer from "../components/CompanyContainer";

const companyList = [
    {id: 0,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
    {id: 1,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
    {id: 2,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
    {id: 3,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
    {id: 4,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
    {id: 5,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
    {id: 6,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},

]

const CompanyProfile = () => {
    const location = useLocation()
    const {data} = location.state
    const companyData =  companyList.find(obj => obj.id === data);

    return (
        <>
            {companyData && <CompanyContainer companyData={companyData}/>}
        </>

    );
};

export default CompanyProfile;