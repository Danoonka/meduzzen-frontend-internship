import React, {useEffect, useState} from 'react';
import {ActionUserState, AllActionUsersState, CompanyItemProps, initialActionAllUsersState} from "../../types";
import {membersListCompanyThunk, removeAdminThunk} from "../../store/reduxThunk";
import UserRows from "./UserRows";
import Button from "../../utils/Button";
import CheckModal from "../modalWindows/CheckModal";

const CompanyProfileAdmins = ({companyData}: CompanyItemProps) => {
    const [adminsList, setAdminsList] = useState<AllActionUsersState>(initialActionAllUsersState)
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(0);

    useEffect(() => {
        membersListCompanyThunk(companyData.company_id)
            .then((res) => {
                const admins = (res?.data.result.users).filter(function (el: ActionUserState) {
                    return el.action === 'admin'
                })
                setAdminsList({users: admins})
            })

    }, [adminsList.users.length])

    const onClickRemoveAdmin = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }


    const adminRows = (adminsList.users).map((item: ActionUserState) => {
        return (
            <UserRows currentUser={item} key={item.user_id} children={
                <Button onClick={() => onClickRemoveAdmin(item.action_id)}>remove Admin</Button>
            }/>
        )
    })

    const onCallBack = () => {
        removeAdminThunk(modalData)
            .then(() => membersListCompanyThunk(companyData.company_id)
                .then((res) => {
                    const admins = (res?.data.result.users)
                        .filter(function (el: ActionUserState) {
                            return el.action === 'admin'
                        })
                    setAdminsList({users: admins})
                }))
    }
    return (
        <div>
            {adminRows}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}  callback={() => onCallBack()}/>
        </div>
    );
};

export default CompanyProfileAdmins;