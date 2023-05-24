import React, {useEffect, useState} from 'react';
import {
    ActionUserState,
    AllActionUsersState, CompanyItemProps,
    initialActionAllUsersState,
} from "../../types";
import {BlackListThunk, removeFromBlackListThunk} from "../../store/reduxThunk";
import Button from "../../utils/Button";
import UserRows from "./UserRows";


const CompanyProfileBlockList = ({companyData}: CompanyItemProps) => {
    const [blockList, setBlockList] = useState<AllActionUsersState>(initialActionAllUsersState)

    useEffect(() => {
        BlackListThunk(companyData.company_id)
            .then((res) => {
                setBlockList(res.result)
            })
    }, [blockList.users.length, companyData.company_id])

    const onClickRemove = (action_id: number) => {
        removeFromBlackListThunk(action_id)
            .then(() => BlackListThunk(companyData.company_id)
                .then((res) => {
                    setBlockList(res.result)
                })
            )
    }


    const blackList = (blockList.users).map((item: ActionUserState) =>
        <UserRows currentUser={item} key={item.user_id}
                  children={<Button onClick={() => onClickRemove(item.action_id)}>Remove</Button>}/>
    )
    return (
        <div data-testid="company-profile-blockList">
            {blackList}
        </div>
    );
};

export default CompanyProfileBlockList;