import React, {useState} from 'react';
import {CompanyState, initialCompanyState} from "../../types";
import {useNavigate} from "react-router-dom";
import {createCompanyThunk} from "../../store/reduxThunk";
import {toast} from "react-toastify";
import Input from "../../utils/Input";
import {Switch} from "@mui/material";
import Button from "../../utils/Button";
import Modal from "./Modal";

interface CreateCompanyModalProps {
    isOpen: boolean,
    toggle: () => void;
}

const CreateCompanyModal = ({ toggle, isOpen }: CreateCompanyModalProps) => {
    const [company, setCompany] = useState<CompanyState>(initialCompanyState)
    const navigate = useNavigate();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCompany({...company, company_name: value});
    }

    const handleChangeSwitch = () => {
        setCompany({...company, is_visible: !company.is_visible})
    }

    const createCompanyOnClick = () =>{
        createCompanyThunk(company).then(res => {
            if (res !== -1){
                navigate(`/companyProfile/${res}`, {state: {company_id: res}})
            }else{
                toast.error('Failed to create company!',{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        })
    }

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    return (
        <Modal isOpen={isOpen} toggle={toggle} classNM='modal-box'>
            <h2>Create Company</h2>
            <Input
                name='company_name'
                label='Company name'
                value={company.company_name}
                onChange={handleInputChange}
                id='1'
                type='company_name'
            />
            <label htmlFor='checkBox'>Visibility</label>
            <Switch onChange={handleChangeSwitch} name='checkBox' {...label} defaultChecked />
            <div className="company-create-button">
                <Button onClick={createCompanyOnClick}>Create</Button>
            </div>
        </Modal>
    );
};

export default CreateCompanyModal;