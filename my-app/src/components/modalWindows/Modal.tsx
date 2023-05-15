import React, {ReactNode, useState} from 'react';
import './Modal.css'

interface ModalType {
    children: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    callback?: () => void
}

const Modal = (props: ModalType) => {
    return (
        <>
            {props.isOpen && (
                <div className="modal-overlay" onClick={props.toggle}>
                    <div onClick={(e) => e.stopPropagation()} className="modal-box">
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;