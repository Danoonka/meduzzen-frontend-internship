import React, {ReactNode, useState} from 'react';
import './Modal.css'
import Input from "../utils/Input";
import {Switch} from "@mui/material";
import Button from "../utils/Button";
import {CompanyState, initialCompanyState} from "../types";
import {createCompany} from "../api/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}


const Modal = (props: ModalType) => {
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
       createCompany(company).then(res => {
           if (res !== -1){
               navigate('/companyProfile', {state: {company_id: res}})
           }else{
               toast.error('Failed to create company!',{
                   position: toast.POSITION.BOTTOM_RIGHT
               })
           }
       })
    }

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    return (
        <>
            {props.isOpen && (
                <div className="modal-overlay" onClick={props.toggle}>
                    <div onClick={(e) => e.stopPropagation()} className="modal-box">
                        {props.children}
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
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;