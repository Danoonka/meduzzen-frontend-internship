import React from 'react';
import Modal from "./Modal";
import './SendInviteModal.css'
import Button from "../../utils/Button";
import {CheckModalProps} from "../../types";
import './CheckModal.css'


const CheckModal = ({toggle, isOpen, callback}: CheckModalProps) => {
    return (
        <div className="checkModal">
            <Modal isOpen={isOpen} toggle={toggle} classNM="check-modal-box">
                <p>Are you sure?</p>
                <Button onClick={() => {
                    callback()
                    toggle()
                }}>Yes</Button>
            </Modal>
        </div>

    );
};

export default CheckModal;