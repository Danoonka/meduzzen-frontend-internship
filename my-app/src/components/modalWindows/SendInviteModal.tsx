import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {AllUsersState, CurrentUserState} from "../../types";
import {createInviteThunk, paginationThunk} from "../../store/reduxThunk";
import UserRows from "../companyProfile/UserRows";
import './SendInviteModal.css';
import Input from "../../utils/Input";
import Button from "../../utils/Button";

interface SendInviteModalProps {
    isOpen: boolean,
    toggle: () => void;
}


const SendInviteModal = ({toggle, isOpen}: SendInviteModalProps) => {
    const company = useSelector((state: RootState) => state.company);
    const pagInfo = useSelector((state: RootState) => state.paginationUserInfo)

    useEffect(() => {
        if (pagInfo.total_results === -1) {
            paginationThunk('users', 1, 1)
        } else {
            paginationThunk('users', 1, pagInfo.total_results)
        }
    }, [pagInfo.total_results])


    const allUsers = useSelector((state: RootState) => state.allUser as AllUsersState);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = allUsers.users.filter((user) => {
        return user.user_firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.user_lastname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const onClickInvite = (user_id: number, company_id: number) => {
        createInviteThunk(user_id, company_id)
    }

    const users = filteredUsers.map((item: CurrentUserState) =>
        <UserRows currentUser={item} key={item.user_id}
                  children={<Button onClick={() => onClickInvite(item.user_id, company.company_id)}>Invite</Button>}/>
    );

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <div className="send-invite-container">
                <h2>Send invite</h2>
                <Input id='0' type="text" name="Search" label="Find User" value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}/>
                <div className="scrollable">
                    {users}
                </div>
            </div>
        </Modal>
    );
};

export default SendInviteModal;