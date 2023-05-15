import React, {useEffect, useState} from 'react';
import {
    addToBlackListThunk,
    fireLeaveMemberThunk,
    membersListCompanyThunk,
} from "../../store/reduxThunk";
import {ActionUserState, AllActionUsersState, CompanyItemProps, initialActionAllUsersState} from "../../types";
import UserRows from "./UserRows";
import Button from "../../utils/Button";

const CompanyProfileMembers = ({companyData}: CompanyItemProps) => {
    const [membersList, setMembersList] = useState<AllActionUsersState>(initialActionAllUsersState)

    useEffect(() => {
        membersListCompanyThunk(companyData.company_id)
            .then((res) => {
                setMembersList(res?.data.result)
            })

    }, [])

    const onClickFire = (action_id: number) => {
        fireLeaveMemberThunk(action_id)
            .then(() => membersListCompanyThunk(companyData.company_id)
                .then((res) => {
                    setMembersList(res?.data.result)
                }))
    }

    useEffect(() => {
    }, [JSON.stringify(membersList.users)])

    const onClickBlockUser = (action_id: number) => {
        addToBlackListThunk(action_id)
            .then(() => membersListCompanyThunk(companyData.company_id)
                .then((res) => {
                    setMembersList(res?.data.result)
                }))
    }

    const members = (membersList.users).map((item: ActionUserState) => {
        const isOwner = item.action === 'owner';
        return (
            <UserRows
                currentUser={item}
                key={item.user_id}
                children={
                    <>
                        <Button
                            onClick={() => onClickFire(item.action_id)}
                            disabled={isOwner}>Fire</Button>
                        <Button onClick={() => onClickBlockUser(item.action_id)}
                                disabled={isOwner}>Block Member</Button>
                    </>}
            />)
    })

    return (
        <div>
            {members}
        </div>
    );
};

export default CompanyProfileMembers;