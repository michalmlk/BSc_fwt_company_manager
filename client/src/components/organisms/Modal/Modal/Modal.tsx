import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'primereact/button';
import { StyledCard } from './Modal.styles';

interface ModalProps {
    title: string;
    onClose: () => void;
    type: 'button' | 'submit';
    label: string;
    icon: string;
    renderFooter: boolean;
    onConfirm?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
}

const Modal = ({ title, children, type, onClose, onConfirm, label, disabled, icon, renderFooter }: ModalProps) => {
    return ReactDOM.createPortal(
        <StyledCard className="flex flex-column px-2 py-2 w-6" title={title}>
            {children}
            {renderFooter && (
                <ModalFooter
                    onClose={onClose}
                    icon={icon}
                    type={type}
                    disabled={!!disabled}
                    label={label}
                    onConfirm={onConfirm}
                />
            )}
        </StyledCard>,
        document.getElementById('modal-root')!
    );
};

export const ModalFooter: ({
    onClose,
    onConfirm,
    icon,
    label,
    disabled,
    type,
}: {
    onClose: any;
    onConfirm: any;
    icon: string;
    label: string;
    disabled: boolean;
    type: 'button' | 'submit';
}) => void = ({ onClose, onConfirm, icon, label, disabled, type }) => (
    <div className="flex w-12 justify-content-between py-2">
        <Button icon="pi pi-times" label="Cancel" onClick={onClose} rounded outlined severity="secondary" />
        <Button icon={icon} type={type} onClick={onConfirm} rounded label={label} disabled={disabled} />
    </div>
);

export default Modal;
