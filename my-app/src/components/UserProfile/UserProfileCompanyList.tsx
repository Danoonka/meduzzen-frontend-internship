import React, {useEffect, useState} from 'react';
import {
    ActionCompanyState,
    AllActionCompaniesState,
    initialAllActionCompaniesState, UserProps
} from "../../types";
import {fireLeaveMemberThunk, myCompanyListThunk} from "../../store/reduxThunk";
import CompanyRows from "./CompanyRows";
import Button from "../../utils/Button";


const UserProfileCompanyList = ({user_id}: UserProps) => {
    const [companyList, setCompanyList] = useState<AllActionCompaniesState>(initialAllActionCompaniesState)

    useEffect(() => {
        myCompanyListThunk(user_id)
            .then((res) => {
                setCompanyList(res?.data.result)
            })
    }, [companyList.companies.length])

    const companies = (companyList.companies).map((item: ActionCompanyState) => {
            const isOwner = item.action === 'owner';
            return (
                <CompanyRows
                    companyData={item} key={item.company_id}
                    children={<Button onClick={() => onClickLeave(item.action_id)}
                                      disabled={isOwner}>Leave company</Button>}/>)
        }
    )


    const onClickLeave = (action_id: number) => {
        fireLeaveMemberThunk(action_id).then(res =>
            myCompanyListThunk(user_id)
                .then((res) => {
                    setCompanyList(res?.data.result)
                })
        )
    }

    return (
        <div>
            {companies}
        </div>
    );
};

export default UserProfileCompanyList;