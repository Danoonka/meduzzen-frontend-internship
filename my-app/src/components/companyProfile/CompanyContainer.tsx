import React, {ReactNode, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";
import Button from "../../utils/Button";
import {
    getCompanyByIdThunk, membersListCompanyThunk,
    myCompanyListThunk,
    updateCompanyAvatarThunk
} from "../../store/reduxThunk";
import CompanyProfileMembers from "./CompanyProfileMembers";
import CompanyProfileInvites from "./CompanyProfileInvites";
import CompanyProfileRequests from "./CompanyProfileRequests";
import CompanyProfileBlockList from "./CompanyProfileBlockList";
import SendInviteModal from "../modalWindows/SendInviteModal";
import {
    ActionUserState,
    AllActionCompaniesState, AllActionUsersState,
    CompanyProps, initialActionAllUsersState,
    initialAllActionCompaniesState
} from "../../types";
import CompanyProfileAdmins from "./CompanyProfileAdmins";
import CompanyProfileQuizzes from "./CompanyProfileQuizzes";
import CompanyProfileAnalytics from "./CompanyProfileAnalytics";


const CompanyContainer = ({company_id}: CompanyProps) => {
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const company = useSelector((state: RootState) => state.company)

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [adminsList, setAdminsList] = useState<AllActionUsersState>(initialActionAllUsersState)
    const navigate = useNavigate();

    const [companyList, setCompanyList] = useState<AllActionCompaniesState>(initialAllActionCompaniesState)

    useEffect(() => {
        myCompanyListThunk(currentUser.user_id)
            .then((res) => {
                setCompanyList(res.result)
            })
    }, [companyList.companies.length, currentUser.user_id])

    useEffect(() => {
        if (isMember) {
            membersListCompanyThunk(company_id)
                .then((res) => {
                    const admins = (res.result.users).filter(function (el: ActionUserState) {
                        return el.action === 'admin'
                    })
                    setAdminsList({users: admins})
                })
        }
    }, [adminsList.users.length, company_id])

    useEffect(() => {
        getCompanyByIdThunk(company_id)
    }, [company_id])

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    function isCompanyInList(companyList: AllActionCompaniesState, companyId: number): boolean {
        return companyList.companies.some(company => company.company_id === companyId);
    }

    function isUserInAdminsList(adminList: AllActionUsersState, userId: number): boolean {
        return adminList.users.some(user => user.user_id === userId);
    }

    const isOwner = company.company_owner.user_id === currentUser.user_id
    const isMember = isCompanyInList(companyList, company.company_id)
    const isAdmin = isUserInAdminsList(adminsList, currentUser.user_id)

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
                setCurrentElement(<CompanyProfileMembers companyData={company} isPermission={(isOwner || isAdmin)}/>)
                return
            case 'invites':
                setCurrentElement(<CompanyProfileInvites companyData={company}/>)
                return
            case 'requests':
                setCurrentElement(<CompanyProfileRequests companyData={company}/>)
                return
            case 'blockList' :
                setCurrentElement(<CompanyProfileBlockList companyData={company}/>)
                return
            case 'admins' :
                setCurrentElement(<CompanyProfileAdmins companyData={company}/>)
                return
            case 'quizzes':
                setCurrentElement(<CompanyProfileQuizzes companyData={company}/>)
                return
            case 'analytics':
                setCurrentElement(<CompanyProfileAnalytics companyData={company}/>)
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
            {(isOwner || isMember) &&
            <>
                <div className='parent'>
                    <div>
                        <Button onClick={menuHandler} name='members'>Members</Button>
                        {isOwner &&
                        <>
                            <Button onClick={menuHandler} name='invites'>Invites</Button>
                            <Button onClick={menuHandler} name='requests'>Requests</Button>
                            <Button onClick={menuHandler} name='blockList'>Block List</Button>
                            <Button onClick={menuHandler} name='admins'>Admins</Button>
                        </>
                        }
                        {(isOwner || isAdmin) &&
                        <Button onClick={menuHandler} name='analytics'>Analytics</Button>
                        }
                        <Button onClick={menuHandler} name='quizzes'>Quizzes</Button>
                        <div>
                            {currentElement}
                        </div>
                    </div>
                </div>
                <div data-testid='send-invite-modal'>
                    <SendInviteModal isOpen={isOpen} toggle={toggle}/>
                </div>
            </>

            }
        </div>

    );
};

export default CompanyContainer;