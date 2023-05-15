import React, {useEffect, useState} from 'react';
import {ActionUserState, AllActionUsersState, CompanyItemProps, initialActionAllUsersState} from "../../types";
import {makeMemberAdminThunk, membersListCompanyThunk, removeAdminThunk} from "../../store/reduxThunk";
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

    }, [])

    const onClickRemoveAdmin = (action_id: number) => {
        setModalData(action_id)
        setIsOpen(!isOpen);
    }


    useEffect(() => {
    }, [JSON.stringify(adminsList.users)])

    const adminRows = (adminsList.users).map((item: ActionUserState) => {
        return (
            <UserRows currentUser={item} key={item.user_id} children={
                <Button onClick={() => onClickRemoveAdmin(item.action_id)}>remove Admin</Button>
            }/>
        )
    })
    return (
        <div>
            {adminRows}
            <CheckModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}
                        callback={() => removeAdminThunk(modalData)
                            .then(() => membersListCompanyThunk(companyData.company_id)
                                .then((res) => {
                                    const admins = (res?.data.result.users)
                                        .filter(function (el: ActionUserState) {
                                            return el.action === 'admin'
                                        })
                                    setAdminsList({users: admins})
                                }))}/>
        </div>
    );
};

export default CompanyProfileAdmins;