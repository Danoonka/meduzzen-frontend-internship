import React from 'react';
import Modal from "./Modal";
import './SendInviteModal.css'
import Button from "../../utils/Button";
import {declineActionThunk} from "../../store/reduxThunk";
import {CheckModalProps} from "../../types";
import './CheckModal.css'


const CheckModal = ({toggle, isOpen, action_id, callback}: CheckModalProps) => {
    return (
        <div className="checkModal">
            <Modal isOpen={isOpen} toggle={toggle}>
                <p>Are you sure?</p>
                <Button onClick={() => {

                    declineActionThunk(action_id).then(()=>callback())
                    toggle()
                }}>Yes</Button>
            </Modal>
        </div>

    );
};

export default CheckModal;