import React, {ReactNode} from 'react';
import './Modal.css'

interface ModalType {
    children: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    callback?: () => void
    classNM?: string;
}

const Modal = (props: ModalType) => {
    return (
        <>
            {props.isOpen && (
                <div className="modal-overlay" onClick={props.toggle}>
                    <div onClick={(e) => e.stopPropagation()} className={props.classNM}>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;