import React, {useEffect, useState} from 'react';
import {
    ActionCompanyState,
    AllActionCompaniesState,
    initialAllActionCompaniesState, UserProps
} from "../../types";
import {fireLeaveMemberThunk, myCompanyListThunk} from "../../store/reduxThunk";
import CompanyRows from "./CompanyRows";
import Button from "../../utils/Button";
import CheckModal from "../modalWindows/CheckModal";


const UserProfileCompanyList = ({user_id}: UserProps) => {
    const [companyList, setCompanyList] = useState<AllActionCompaniesState>(initialAllActionCompaniesState)
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(0);

    const onClickLeaveCompany = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }
    useEffect(() => {
        myCompanyListThunk(user_id)
            .then((res) => {
                setCompanyList(res.result)
            })
    }, [companyList.companies.length, user_id])

    const companies = (companyList.companies).map((item: ActionCompanyState) => {
            const isOwner = item.action === 'owner';
            return (
                <CompanyRows
                    companyData={item} key={item.company_id}
                    children={<Button onClick={() => onClickLeaveCompany(item.action_id)}
                                      disabled={isOwner}>Leave company</Button>}/>)
        }
    )


    const onClickLeave = () => {
        fireLeaveMemberThunk(modalData).then(() =>
            myCompanyListThunk(user_id)
                .then((res) => {
                    setCompanyList(res.result)
                })
        )
    }

    return (
        <div>
            {companies}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} callback={()=>onClickLeave()}/>
        </div>
    );
};

export default UserProfileCompanyList;