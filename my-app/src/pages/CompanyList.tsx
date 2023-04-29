import React from 'react';
import aboutPageCompanyImg from "../assets/about-page-company-img.png";
import CompanyContainer from "../components/CompanyContainer";
import CompanyItem from "../components/CompanyItem";


const CompanyList = () => {
    const companyList = [
        {id: 0,  "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string"},
        {id: 1,  "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string"},
        {id: 2,  "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string"},
        {id: 3,  "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string"},
        {id: 4,  "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string"},
        {id: 5,  "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string"},
        {id: 6,  "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string"},
    ]
    const companies = companyList.map((item) =>
       <CompanyItem companyData ={item} key={item.id}/>
    )

    return (
        <div>
            <h3 className="user-list-heading">Companies List</h3>
            <div className="user-list-container">
                {companies}
            </div>
        </div>

    );
};

export default CompanyList;