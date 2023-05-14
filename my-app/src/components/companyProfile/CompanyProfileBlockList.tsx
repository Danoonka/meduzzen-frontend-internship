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
                setBlockList(res?.data.result)
            })

    }, [blockList])

    const onClickRemove = (action_id: number) => {
        removeFromBlackListThunk(action_id)
    }

    const blackList = (blockList.users).map((item: ActionUserState) =>
        <UserRows currentUser={item} key={item.user_id}
                  children={<Button onClick={() => onClickRemove(item.action_id)}>Remove</Button>}/>
    )
    return (
        <div>
            {blackList}
        </div>
    );
};

export default CompanyProfileBlockList;