import React from 'react';
import aboutPageCompanyImg from "../assets/about-page-company-img.png";
import {Link} from "react-router-dom";

const CompanyList = () => {
    const companyList = [
        {id: 0,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
        {id: 1,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
        {id: 2,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
        {id: 3,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
        {id: 4,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
        {id: 5,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},
        {id: 6,  "company_email": "string", "company_name": "string", "company_avatar": aboutPageCompanyImg,  "company_city": "string", "company_phone": "string"},

    ]
    const companies = companyList.map((item) =>
        <Link to='/companyProfile' key={item.id} state={{data: item}}>
            <div>
                <img src={item.company_avatar} alt="company avatar"/>
                <div>
                    <h4>{item.company_name}</h4>
                    <p>{item.company_city}</p>
                </div>
            </div>
        </Link>
    )

    return (
        <div>
            {companies}
        </div>
    );
};

export default CompanyList;