import React, {useEffect, useState} from 'react';
import {
    ActionUserState, AllActionUsersState, CompanyItemProps, initialActionAllUsersState,
} from "../../types";
import {invitesListCompanyThunk} from "../../store/reduxThunk";
import UserRows from "./UserRows";
import Button from "../../utils/Button";
import CheckModal from "../modalWindows/CheckModal";


const CompanyProfileInvites = ({companyData}: CompanyItemProps) => {
    const [inviteList, setInviteList] = useState<AllActionUsersState>(initialActionAllUsersState)
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(0);

    useEffect(() => {
        invitesListCompanyThunk(companyData.company_id)
            .then((res) => {
                setInviteList(res?.data.result)
            })

    }, [])

    const onClickDecline = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }

    useEffect(() => {
    }, [JSON.stringify(inviteList.users)])

    const invites = (inviteList.users).map((item: ActionUserState) =>
        <UserRows currentUser={item} key={item.user_id} children={<>
            <Button onClick={() => onClickDecline(item.action_id)}>Decline Invite</Button>
        </>}/>
    )
    return (
        <>
            <div>
                {invites}
            </div>
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} action_id={modalData}
                        callback={() => invitesListCompanyThunk(companyData.company_id)
                            .then((res) => setInviteList(res?.data.result))}/>
        </>

    );
};

export default CompanyProfileInvites;