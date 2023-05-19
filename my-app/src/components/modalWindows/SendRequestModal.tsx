import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {createRequestThunk, paginationThunk} from "../../store/reduxThunk";
import {AllCompaniesState, CompanyState, ModalProps} from "../../types";
import Modal from "./Modal";
import CompanyRows from "../UserProfile/CompanyRows";
import Input from "../../utils/Input";
import Button from "../../utils/Button";


const SendRequestModal = ({toggle, isOpen}: ModalProps) => {
    const pagInfo = useSelector((state: RootState) => state.paginationInfo)
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        if (pagInfo.total_results === -1) {
            paginationThunk('companies', 1, 1)
        } else {
            paginationThunk('companies', 1, pagInfo.total_results)
        }
    }, [pagInfo.total_results])


    const allCompanies = useSelector((state: RootState) => state.allCompanies as AllCompaniesState);
    const filteredCompanies = allCompanies.companies.filter((company) => {
        return company.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const onClickRequest = (company_id: number) => {
        createRequestThunk(company_id)
    }

    const companies = filteredCompanies.map((item: CompanyState) =>
        <CompanyRows companyData={item} key={item.company_id}
                     children={<Button onClick={() => onClickRequest(item.company_id)}>Send Request</Button>}/>
    );

    return (
        <Modal isOpen={isOpen} toggle={toggle} classNM="send-inv-modal">
            <h2>Send request</h2>
            <Input id='0' type="text" name="Search" label="Find Company" value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}/>
            <div className="scrollable">
                {companies}
            </div>
        </Modal>
    );
};

export default SendRequestModal;