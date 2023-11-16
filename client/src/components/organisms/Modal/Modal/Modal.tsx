import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'primereact/button';
import { StyledBackdrop, StyledCard } from './Modal.styles';

interface ModalProps {
    title: string;
    onClose: () => void;
    renderFooter: boolean;
    type?: 'button' | 'submit';
    label?: string;
    icon?: string;
    onConfirm?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
    classNames?: string;
}

const Modal = ({
    title,
    children,
    type,
    onClose,
    onConfirm,
    label,
    disabled,
    icon,
    renderFooter,
    classNames,
}: ModalProps) => {
    return (
        <>
            {ReactDOM.createPortal(
                <StyledCard className={`flex flex-column px-2 py-2 ${classNames}`} title={title}>
                    {children}
                    {renderFooter && (
                        <ModalFooter
                            onClose={onClose}
                            icon={icon!}
                            type={type!}
                            disabled={!!disabled}
                            label={label!}
                            onConfirm={onConfirm}
                        />
                    )}
                </StyledCard>,
                document.getElementById('modal-root')!
            )}
            {ReactDOM.createPortal(<StyledBackdrop />, document.getElementById('modal-backdrop')!)}
        </>
    );
};

export const ModalFooter = ({
    onClose,
    onConfirm,
    icon,
    label,
    disabled,
    type,
}: {
    onClose: any;
    icon: string;
    label: string;
    disabled: boolean;
    type: 'button' | 'submit';
    onConfirm?: any;
}) => (
    <div className="flex w-12 justify-content-between py-2">
        <Button icon="pi pi-times" label="Cancel" onClick={onClose} outlined severity="secondary" />
        <Button icon={icon} type={type} onClick={onConfirm} label={label} disabled={disabled} />
    </div>
);

export default Modal;
