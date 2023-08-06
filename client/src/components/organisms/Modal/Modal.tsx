import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'primereact/button';
import { StyledCard } from './Modal.styles';

interface ModalProps {
    title: string;
    onClose: () => void;
    onConfirm?: () => void;
    children?: React.ReactNode;
}

const Modal = ({ title, onClose, onConfirm, children }: ModalProps) => {
    return ReactDOM.createPortal(
        <StyledCard className="flex flex-column px-2 py-2 w-6" title={title}>
            {children}
            <div className="flex w-12 justify-content-between py-2">
                <Button icon="pi pi-times" label="Cancel" onClick={onClose} rounded outlined severity="secondary" />
                <Button icon="pi pi-plus" onClick={onConfirm} rounded label="Add" />
            </div>
        </StyledCard>,
        document.getElementById('modal-root')!
    );
};

export default Modal;
