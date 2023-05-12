import React from 'react';
import './UserList.css'
import UserItem from "../components/UserItem";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Pagination} from "@mui/material";
import {AllUsersState, CurrentUserState} from "../types";
import {paginationThunk} from "../store/reduxThunk";

interface PaginationInfo {
    current_page: number,
    total_page: number,
    total_results: number
}

let paginationInfo: PaginationInfo = {
    current_page: 1,
    total_page: 1,
    total_results: -1
}

const usersPerPage = 15;

const UserList = () => {
    if(paginationInfo.total_results === -1) {
        paginationThunk('users', paginationInfo.current_page, usersPerPage)
            .then(res => paginationInfo = res)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        paginationInfo.current_page = value
        paginationThunk('users', paginationInfo.current_page, usersPerPage)
            .then(res => paginationInfo = res)
    };

    const allUsers = useSelector((state: RootState) => state.allUser as AllUsersState);

    const users = (allUsers.users).map((item: CurrentUserState) =>
        <UserItem currentUser={item} key={item.user_id}/>
    )

    return (
        <div className='container'>
            <h3 className="user-list-heading">User List</h3>
            <div className="user-list-container">
                {users}
            </div>
            <div className="user-list-container">
                <Pagination className="user-pagination" count={paginationInfo.total_page}
                            page={paginationInfo.current_page} onChange={handleChange}/>
            </div>
        </div>

    );
};

export default UserList;