import React, {useEffect, useState} from 'react';
import {
    ActionCompanyState, AllActionCompaniesState, initialAllActionCompaniesState, UserProps,
} from "../../types";
import {acceptInviteThunk, invitesListThunk, requestListThunk} from "../../store/reduxThunk";
import CompanyRows from "./CompanyRows";
import Button from "../../utils/Button";
import CheckModal from "../modalWindows/CheckModal";


const UserProfileInvites = ({user_id}: UserProps) => {
    const [inviteList, setInviteList] = useState<AllActionCompaniesState>(initialAllActionCompaniesState)
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(0);

    const onClickDecline = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        invitesListThunk(user_id)
            .then((res) => {
                setInviteList(res?.data.result)
            })
    }, [inviteList.companies.length])


    const onClickAcceptInvite = (action_id: number) => {
        acceptInviteThunk(action_id)
            .then(() => invitesListThunk(user_id)
                .then((res) => {
                    setInviteList(res?.data.result)
                }))
    }


    const invites = (inviteList.companies).map((item: ActionCompanyState) =>
        <CompanyRows companyData={item}
                     key={item.company_id}
                     children={<>
                         <Button onClick={() => onClickAcceptInvite(item.action_id)}>Accept Invite</Button>
                         <Button onClick={() => onClickDecline(item.action_id)}>Decline Invite</Button>
                     </>}
        />
    )

    return (
        <div>
            {invites}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} action_id={modalData}
                        callback={() => invitesListThunk(user_id)
                            .then((res) => setInviteList(res?.data.result))}/>
        </div>
    );
};

export default UserProfileInvites;