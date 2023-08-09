import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'primereact/button';
import { StyledCard } from './Modal.styles';

interface ModalProps {
    title: string;
    onClose: () => void;
    type: 'button' | 'submit';
    label: string;
    onConfirm?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
}

const Modal = ({ title, onClose, onConfirm, children, type, label, disabled }: ModalProps) => {
    return ReactDOM.createPortal(
        <StyledCard className="flex flex-column px-2 py-2 w-6" title={title}>
            {children}
            <div className="flex w-12 justify-content-between py-2">
                <Button icon="pi pi-times" label="Cancel" onClick={onClose} rounded outlined severity="secondary" />
                <Button icon="pi pi-plus" type={type} onClick={onConfirm} rounded label={label} disabled={disabled} />
            </div>
        </StyledCard>,
        document.getElementById('modal-root')!
    );
};

export default Modal;
