import React, {useEffect, useState} from 'react';
import {
    ActionUserState,
    AllActionUsersState, CompanyItemProps,
    initialActionAllUsersState,
} from "../../types";
import {
    acceptRequestThunk,
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
                setRequestList(res?.data.result)
            })

    }, [requestList, companyData.company_id])

    const onClickAcceptRequest = (action_id: number) => {
        acceptRequestThunk(action_id)
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
    return (
        <div>
            {request}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} action_id={modalData}/>
        </div>
    );
};

export default CompanyProfileRequests;