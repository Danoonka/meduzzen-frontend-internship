import React, {useEffect, useState} from 'react';
import {
    ActionUserState,
    AllActionUsersState, CompanyItemProps,
    initialActionAllUsersState,
} from "../../types";
import {
    acceptRequestThunk, declineActionThunk,
    requestListCompanyThunk
} from "../../store/reduxThunk";
import Button from "../../utils/Button";
import UserRows from "./UserRows";
import CheckModal from "../modalWindows/CheckModal";


const CompanyProfileRequests = ({companyData}: CompanyItemProps) => {
    const [requestList, setRequestList] = useState<AllActionUsersState>(initialActionAllUsersState)
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(0);

    const onClickDecline = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }


    useEffect(() => {
        requestListCompanyThunk(companyData.company_id)
            .then((res) => {
                setRequestList(res?.result)
            })
    }, [requestList.users.length, companyData.company_id])

    const onClickAcceptRequest = (action_id: number) => {
        acceptRequestThunk(action_id)
            .then(() => requestListCompanyThunk(companyData.company_id)
                .then((res) => {
                    setRequestList(res?.result)
                }))
    }

    const request = (requestList.users).map((item: ActionUserState) =>
        <UserRows
            currentUser={item}
            key={item.user_id}
            children={<>
                <Button onClick={() => onClickAcceptRequest(item.action_id)}>Accept Request</Button>
                <Button onClick={() => onClickDecline(item.action_id)}>Decline Request</Button>
            </>}/>
    )

    const onCallBack = () => {
        declineActionThunk(modalData)
            .then(() => requestListCompanyThunk(companyData.company_id)
                .then((res) => setRequestList(res?.result)))
    }
    return (
        <div data-testid="company-profile-requests">
            {request}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}
                        callback={() => onCallBack()}/>
        </div>
    );
};

export default CompanyProfileRequests;