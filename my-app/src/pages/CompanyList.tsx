import React, {useEffect, useState} from 'react';
import CompanyItem from "../components/CompanyItem";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Pagination} from "@mui/material";
import {AllCompaniesState, CompanyState} from "../types";
import Button from "../utils/Button";
import {paginationThunk} from "../store/reduxThunk";
import CreateCompanyModal from "../components/modalWindows/CreateCompanyModal";


export const companiesPerPage = 15;

const CompanyList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pagInfo = useSelector((state: RootState) => state.paginationInfo)
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        paginationThunk('companies', pagInfo.current_page, companiesPerPage)
    }, [pagInfo.current_page])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        pagInfo.current_page = value
        paginationThunk('companies', pagInfo.current_page, companiesPerPage)

    };

    const allCompanies = useSelector((state: RootState) => state.allCompanies as AllCompaniesState);
    const companies = (allCompanies.companies).map((item: CompanyState) =>
        <CompanyItem companyData={item} key={item.company_id}/>
    )


    return (
        <div>
            <h3 className="user-list-heading">Companies List</h3>
            <Button className='button-create-company universal-button' onClick={toggle}>Create Company</Button>
            <CreateCompanyModal isOpen={isOpen} toggle={toggle}/>
            <div className="user-list-container">
                {companies}
            </div>
            <div className="user-list-container">
                <Pagination className="user-pagination" count={pagInfo.total_page}
                            page={pagInfo.current_page} onChange={handleChange}/>
            </div>
        </div>

    );
};

export default CompanyList;