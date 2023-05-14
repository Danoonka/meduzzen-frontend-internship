import React from 'react';
import Modal from "./Modal";
import './SendInviteModal.css'
import Button from "../../utils/Button";
import {declineActionThunk} from "../../store/reduxThunk";
import {CheckModalProps} from "../../types";


const CheckModal = ({toggle, isOpen, action_id}: CheckModalProps) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <p>Are you sure?</p>
            <Button onClick={() => {
                declineActionThunk(action_id)
                toggle()
            }}>Yes</Button>
        </Modal>
    );
};

export default CheckModal;