import React, {useEffect, useState} from 'react';
import {
    ActionCompanyState,
    AllActionCCompaniesState,
    initialAllActionCompaniesState, UserProps,
} from "../../types";
import {requestListThunk} from "../../store/reduxThunk";
import CompanyRows from "./CompanyRows";
import Button from "../../utils/Button";
import CheckModal from "../modalWindows/CheckModal";


const UserProfileRequests = ({user_id}: UserProps) => {
    const [requestList, setRequestList] = useState<AllActionCCompaniesState>(initialAllActionCompaniesState)
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(0);

    const onClickDecline = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        requestListThunk(user_id)
            .then((res) => {
                setRequestList(res?.data.result)
            })

    }, [requestList, user_id])


    const requests = (requestList.companies).map((item: ActionCompanyState) =>
        <CompanyRows companyData={item}
                     key={item.company_id}
                     children={
                         <>
                             <Button onClick={() => onClickDecline(item.action_id)}>Decline Request</Button>
                         </>
                     }/>
    )
    return (
        <div>
            {requests}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} action_id={modalData}/>
        </div>
    );
};

export default UserProfileRequests;