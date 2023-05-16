import React, {ReactNode, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";
import Button from "../../utils/Button";
import {getCompanyByIdThunk, updateCompanyAvatarThunk} from "../../store/reduxThunk";
import CompanyProfileMembers from "./CompanyProfileMembers";
import CompanyProfileInvites from "./CompanyProfileInvites";
import CompanyProfileRequests from "./CompanyProfileRequests";
import CompanyProfileBlockList from "./CompanyProfileBlockList";
import SendInviteModal from "../modalWindows/SendInviteModal";
import {CompanyProps} from "../../types";


const CompanyContainer = ({company_id}: CompanyProps) => {
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const company = useSelector((state: RootState) => state.company);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    getCompanyByIdThunk(company_id)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

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

    const [currentElement, setCurrentElement] =
        useState<ReactNode>(<></>)

    const menuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const btn = event.target as HTMLButtonElement
        switch (btn.name) {
            case 'members':
                setCurrentElement(<CompanyProfileMembers companyData={company}/>)
                return
            case 'invites':
                setCurrentElement(<CompanyProfileInvites companyData={company}/>)
                return
            case 'requests':
                setCurrentElement(<CompanyProfileRequests companyData={company}/>)
                return
            case 'blockList' :
                setCurrentElement(<CompanyProfileBlockList companyData={company}/>)
        }
    }
    return (
        <div>
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
                    {isOwner &&
                    <>
                        <Button onClick={goToEditCompany}>Edit Info</Button>
                        <Button className='universal-button' onClick={toggle}>Send Invite</Button>

                    </>
                    }
                </div>
            </div>
            {isOwner &&
            <>
                <div className='parent'>
                    <div>
                        <Button onClick={menuHandler} name='members'>Members</Button>
                        <Button onClick={menuHandler} name='invites'>Invites</Button>
                        <Button onClick={menuHandler} name='requests'>Requests</Button>
                        <Button onClick={menuHandler} name='blockList'>Block List</Button>
                        <div>
                            {currentElement}
                        </div>
                    </div>
                </div>
                <SendInviteModal isOpen={isOpen} toggle={toggle}/>
            </>

            }
        </div>

    );
};

export default CompanyContainer;