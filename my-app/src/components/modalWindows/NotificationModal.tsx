import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import {CheckModalProps} from "../../types";
import {getNotificationListThunk, markNotificationAsReadThunk} from "../../store/reduxThunk";
import '../companyProfile/UserRows.css'
import NotificationRows from "./NotificationRows";

export interface Notification {
    notification_id: number,
    notification_title: string,
    notification_message: string,
    notification_user_id: number,
    notification_company_id: number,
    is_read: boolean,
    created_at: number
}

const NotificationModal = ({toggle, isOpen, callback, user_id}: CheckModalProps) => {
    const [notifyList, setNotifyList] = useState<Notification[]>([])
    const [handleChange, setHandleChange] = useState(false)

    useEffect(() => {
        if (user_id) {
            getNotificationListThunk(user_id)
                .then((res) => {
                    setNotifyList((res.result.notifications).reverse())
                    setHandleChange(false)
                })
        }
    }, [notifyList.length, handleChange, user_id])

    const HandleCheckBox = (user_id: number, notification_id: number) => {
        markNotificationAsReadThunk(user_id, notification_id)
            .then(() => setHandleChange(true))
    }

    const notifications = notifyList.map((item, index) => {
        if (!item.is_read) {
            return user_id && <NotificationRows user_id={user_id} HandleCheckBox={HandleCheckBox} item={item}/>;
        }
        return null;
    });

    return (
        <div className="checkModal">
            <Modal isOpen={isOpen} toggle={toggle} classNM="notification-box">
                <h2>Notification</h2>
                <div className="scrollable">
                    {notifications}
                </div>
            </Modal>
        </div>
    );
};

export default NotificationModal;