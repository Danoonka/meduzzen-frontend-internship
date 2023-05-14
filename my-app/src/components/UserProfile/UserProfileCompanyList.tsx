import React, {useEffect, useState} from 'react';
import {
    ActionCompanyState,
    AllActionCCompaniesState,
    initialAllActionCompaniesState, UserProps
} from "../../types";
import {fireLeaveMemberThunk, membersListCompanyThunk, myCompanyListThunk} from "../../store/reduxThunk";
import CompanyRows from "./CompanyRows";
import Button from "../../utils/Button";


const UserProfileCompanyList = ({user_id}: UserProps) => {
    const [companyList, setCompanyList] = useState<AllActionCCompaniesState>(initialAllActionCompaniesState)

    useEffect(() => {
        myCompanyListThunk(user_id)
            .then((res) => {
                setCompanyList(res?.data.result)
            })

    }, [companyList, user_id])


    const onClickLeave = (action_id: number) => {
        fireLeaveMemberThunk(action_id)
    }

    const companies = (companyList.companies).map((item: ActionCompanyState) => {
            const isOwner = item.action === 'owner';
            return (
                <CompanyRows
                    companyData={item} key={item.company_id}
                    children={<Button onClick={() => onClickLeave(item.action_id)}
                                      disabled={isOwner}>Leave company</Button>}/>)
        }
    )
    return (
        <div>
            {companies}
        </div>
    );
};

export default UserProfileCompanyList;