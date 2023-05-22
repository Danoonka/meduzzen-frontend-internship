import React, {useEffect, useState} from 'react';
import {
    addToBlackListThunk,
    fireLeaveMemberThunk, makeMemberAdminThunk,
    membersListCompanyThunk,
} from "../../store/reduxThunk";
import {ActionUserState, AllActionUsersState, CompanyItemProps, initialActionAllUsersState} from "../../types";
import UserRows from "./UserRows";
import Button from "../../utils/Button";
import CheckModal from "../modalWindows/CheckModal";

const CompanyProfileMembers = ({companyData}: CompanyItemProps) => {
    const [membersList, setMembersList] = useState<AllActionUsersState>(initialActionAllUsersState)
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(0);

    useEffect(() => {
        membersListCompanyThunk(companyData.company_id)
            .then((res) => {
                setMembersList(res.result)
            })

    }, [membersList.users.length])

    const onClickFire = (action_id: number) => {
        fireLeaveMemberThunk(action_id)
            .then(() => membersListCompanyThunk(companyData.company_id)
                .then((res) => {
                    setMembersList(res.result)
                }))
    }


    const onClickBlockUser = (action_id: number) => {
        addToBlackListThunk(action_id)
            .then(() => membersListCompanyThunk(companyData.company_id)
                .then((res) => {
                    setMembersList(res.result)
                }))
    }

    const onClickAddToAdmin = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }

    const members = (membersList.users).map((item: ActionUserState) => {
        const isOwner = item.action === 'owner';
        const isAdmin = item.action === 'admin';
        return (
            <UserRows
                currentUser={item}
                key={item.user_id}
                children={
                    <>
                        <Button
                            onClick={() => onClickFire(item.action_id)}
                            disabled={isOwner || isAdmin}>Fire</Button>
                        <Button onClick={() => onClickBlockUser(item.action_id)}
                                disabled={isOwner || isAdmin}>Block Member</Button>
                        {!(isOwner || isAdmin) &&
                        <Button onClick={() => onClickAddToAdmin(item.action_id)}>Add to Admin</Button>
                        }
                    </>}
            />)
    })

    const onCallBack = () => {
        makeMemberAdminThunk(modalData)
            .then(() => membersListCompanyThunk(companyData.company_id)
                .then((res) => setMembersList(res.result)))
    }

    return (
        <div>
            {members}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}
                        callback={() => onCallBack()}/>
        </div>
    );
};

export default CompanyProfileMembers;