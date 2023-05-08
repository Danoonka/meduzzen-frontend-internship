import React, {useEffect, useState} from 'react';
import './UserList.css'
import UserItem from "../components/UserItem";
import {getTotalSizeUsers, pagination} from "../store/actions";
import {getTokenFromLocalStorage} from "../utils/authorizaton";
import {useSelector} from "react-redux";
import {AllUsersState} from "../store/reducers/allUsersReducer";
import {CurrentUserState} from "../store/reducers/currentUserReducer";
import {RootState} from "../store/store";
import {Pagination} from "@mui/material";

interface MyState extends RootState {
    allUser: AllUsersState;
}

const UserList = () => {
    const token = getTokenFromLocalStorage()
    const [page, setPage] = React.useState(1);
    const [totalCount, setTotalCount] = useState<number>(0)
    const usersPerPage = 15
    pagination(token, page, usersPerPage)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        pagination(token, page, usersPerPage);
    };
    useEffect(() => {
        getTotalSizeUsers(token).then(response =>{
            setTotalCount(response)
            })
    }, [token]);

    const allUsers = useSelector((state: MyState) => state.allUser.users);

    const users = (allUsers).map((item: CurrentUserState) =>
        <UserItem currentUser={item} key={item.user_id}/>
    )

    return (
        <div className='container'>
            <h3 className="user-list-heading">User List</h3>
            <div className="user-list-container">
                {users}
            </div>
            <div className="user-list-container">
                <Pagination className="user-pagination" count={Math.ceil(totalCount/usersPerPage)} page={page} onChange={handleChange} />
            </div>
        </div>

    );
};

export default UserList;