import React, { PropsWithChildren } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

interface ModalProps {
    title: string;
    onClose: () => void;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ title, onClose, children }) => {
    return (
        <Card className="flex flex-column px-4 py-2" title={title}>
            <Button icon="pi pi-times" onClick={onClose} />
            {children}
        </Card>
    );
};

export default Modal;
