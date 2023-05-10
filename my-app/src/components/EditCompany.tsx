import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {CompanyState} from "../types";
import {deleteCompany, updateCompanyInfo, updateCompanyVisible} from "../api/api";
import {toast} from "react-toastify";
import Input from "../utils/Input";
import Button from "../utils/Button";
import {Switch} from "@mui/material";

const EditCompany = () => {
    const location = useLocation();
    const company = location.state
    const navigate = useNavigate()

    const [updateCompany, setUpdateCompany] = useState<CompanyState>({
        company_id: company.company_id,
        company_name: company.company_name,
        company_title: company.company_title,
        company_avatar: company.company_avatar,
        is_visible: company.is_visible,
        company_description: company.company_description,
        company_city: company.company_city,
        company_phone: company.company_phone,
        company_links: company.company_links,
        company_owner: company.company_owner
    })

    const handleLinkInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let updatedLinks : string[]
        if (updateCompany.company_links === null) {
            updatedLinks = []
        } else {
            updatedLinks = [...updateCompany.company_links];
            updatedLinks = (value.split(','))
        }
        await setUpdateCompany({...updateCompany, company_links: updatedLinks});
    }

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        await setUpdateCompany({...updateCompany, [event.target.name]: value});
    };

    const saveChanges = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await updateCompanyInfo(company.company_id, updateCompany)
        await updateCompanyVisible(company.company_id, updateCompany.is_visible)
        navigate('/companyProfile', {state: {company_id: company.company_id}})
        toast.success("User info updated", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const deleteCompanyById = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await deleteCompany(company.company_id)
        window.location.reload()
    }

    const handleChangeSwitch = async () => {
        setUpdateCompany({...updateCompany, is_visible: !updateCompany.is_visible})
    }

    const editingFields = [
        {
            label: 'Name',
            name: 'company_name',
            id: '0',
            value: updateCompany.company_name,
            fun: handleInputChange,
            type: 'text'
        },
        {
            label: 'Title',
            name: 'company_title',
            id: '1',
            value: (updateCompany.company_title ? updateCompany.company_title : ''),
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'Description',
            name: 'company_description',
            id: '2',
            value: (updateCompany.company_description ? updateCompany.company_description : ''),
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'City',
            name: 'company_city',
            id: '3',
            value: (updateCompany.company_city ? updateCompany.company_city : ''),
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'Phone',
            name: 'company_phone',
            id: '4',
            value: (updateCompany.company_phone ? updateCompany.company_phone : ''),
            fun: handleInputChange,
            type: 'text',
        },
        {
            label: 'Links',
            name: 'company_links',
            id: '5',
            value: (updateCompany.company_links ? updateCompany.company_links: ''),
            fun: handleLinkInput,
            type: 'text',
        }
    ];

    const fields = editingFields.map((item) => (
        <Input
            name={item.name}
            key={item.id}
            label={item.label}
            value={item.value}
            onChange={item.fun}
            id={item.id}
            type={item.type}
        />
    ));

    const label = {inputProps: {'aria-label': 'Color switch demo'}};
    return (
        <div>
            <form className='edit-form'>
                <div className="section_update_user_info">
                    <h2>Edit Info</h2>
                    <div>
                        <label htmlFor='checkBox'>Visibility</label>
                        <Switch
                            checked={updateCompany.is_visible}
                            onChange={handleChangeSwitch}
                            name='checkBox' {...label}/>
                    </div>

                    {fields}

                </div>
                <div className="section_update_user_password-buttons">
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button className="delete-button" onClick={deleteCompanyById}>Delete company</Button>
                </div>
            </form>
        </div>
    );
};

export default EditCompany;