import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CompanyState, initialCompanyState} from "../types";
import {useNavigate} from "react-router-dom";
import {getCompanyById} from "../api/api";
import Button from "../utils/Button";
import {getCompanyByIdThunk, updateCompanyAvatarThunk} from "../store/reduxThunk";


interface CompanyProps {
    company_id: number;
}

const CompanyContainer: React.FC<CompanyProps> = ({company_id}: CompanyProps) => {
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const company = useSelector((state: RootState) => state.company);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    getCompanyByIdThunk(company_id)

    const isOwner = company.company_owner.user_id === currentUser.user_id

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFile) {
            await updateCompanyAvatarThunk(company.company_id, selectedFile)
        }
        window.location.reload()
    };

    const goToEditCompany = () => {
        navigate('/editCompany')
    }

    return (
        <div className="user-profile-container">
            <div className="user-profile-image-container">
                <img src={company.company_avatar} alt="user avatar"/>
                {isOwner &&
                <form onSubmit={handleFormSubmit}>
                    <input type="file" onChange={handleFileChange}/>
                    <Button type="submit">Upload</Button>
                </form>}
            </div>
            <div>
                <h2>{company.company_name}</h2>
                <p>Company Title: {company.company_title}</p>
                <p>Company description: {company.company_description}</p>
                <p>Location: {company.company_city}</p>
                <p>Contacts: {company.company_phone}</p>
                {(company.company_links !== null) &&
                <div><p>Links:</p> {company.company_links.map((item, idx) => <p key={idx}>{item}</p>)}</div>
                }
                {isOwner && <Button onClick={goToEditCompany}>Edit Info</Button>}
            </div>
        </div>
    );
};

export default CompanyContainer;