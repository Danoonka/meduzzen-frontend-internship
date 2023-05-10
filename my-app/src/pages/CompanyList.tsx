import React from 'react';
import CompanyItem from "../components/CompanyItem";
import {pagination} from "../api/api";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Pagination} from "@mui/material";
import {CompanyState} from "../types";
import Button from "../utils/Button";
import Modal from "../components/Modal";
import useModal from "../components/useModal";

interface PaginationInfo {
    current_page: number,
    total_page: number,
    total_results: number
}

let paginationInfo: PaginationInfo = {
    current_page: 1,
    total_page: 1,
    total_results: -1
}

const companiesPerPage = 15;

const CompanyList = () => {
    const { isOpen, toggle } = useModal();
    if(paginationInfo.total_results === -1) {
        pagination('companies', paginationInfo.current_page, companiesPerPage).then(res => paginationInfo = res)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        paginationInfo.current_page = value
        pagination('companies', paginationInfo.current_page, companiesPerPage).then(res => paginationInfo = res)
    };

    const allCompanies = useSelector((state: RootState) => state.allCompanies.companies);

    const companies = (allCompanies).map((item: CompanyState) =>
        <CompanyItem companyData={item} key={item.company_id}/>
    )


    return (
        <div>
            <h3 className="user-list-heading">Companies List</h3>
            <Button className='button-create-company universal-button' onClick={toggle}>Create Company</Button>
            <Modal isOpen={isOpen} toggle={toggle}/>
            <div className="user-list-container">
                {companies}
            </div>
            <div className="user-list-container">
                <Pagination className="user-pagination" count={paginationInfo.total_page}
                            page={paginationInfo.current_page} onChange={handleChange}/>
            </div>
        </div>

    );
};

export default CompanyList;