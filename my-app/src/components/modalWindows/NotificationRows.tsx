import React from 'react';
import {Checkbox} from "@mui/material";
import {Notification} from "./NotificationModal";

interface NotificationRowsProps {
    user_id: number
    HandleCheckBox: (user_id:number, notification_id: number)=>void
    item: Notification
}

const NotificationRows = ({user_id, HandleCheckBox, item}:NotificationRowsProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    return (
        <div className='user-row-container'>
            <Checkbox {...label} onChange={() => HandleCheckBox(user_id, item.notification_id)}/>
            <div>
                <h2>{item.notification_title}</h2>
                <p>{item.notification_message}</p>
            </div>
            <p>{new Date(item.created_at).toLocaleString()}</p>
        </div>
    );
};

export default NotificationRows;