import React, {useEffect} from 'react';
import './UserList.css'
import UserItem from "../components/UserItem";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Pagination} from "@mui/material";
import {AllUsersState, CurrentUserState} from "../types";
import {paginationThunk} from "../store/reduxThunk";


const usersPerPage = 15;

const UserList = () => {
    const pagInfo = useSelector((state: RootState) => state.paginationUserInfo)

    useEffect(() => {
        paginationThunk('users', pagInfo.current_page, usersPerPage)
    }, [pagInfo.current_page])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        pagInfo.current_page = value
        paginationThunk('users', pagInfo.current_page, usersPerPage)
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
                <Pagination className="user-pagination" count={pagInfo.total_page}
                            page={pagInfo.current_page} onChange={handleChange}/>
            </div>
        </div>

    );
};

export default UserList;