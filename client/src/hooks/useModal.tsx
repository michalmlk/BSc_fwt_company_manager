import React, { ReactNode, useEffect } from 'react';

const useModal = (isOpen: boolean = false) => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(isOpen);

    const handleModalOpen = (): void => {
        setIsModalOpen(true);
    };

    const handleModalClose = (): void => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.getElementById('modal-backdrop')?.classList.add('modal-open');
        }

        return () => {
            document.getElementById('modal-backdrop')?.classList.remove('modal-open');
        };
    }, [isModalOpen]);

    const RenderModal = (CustomModal: ReactNode) => <>{isModalOpen && CustomModal}</>;

    return {
        isModalOpen,
        handleModalOpen,
        handleModalClose,
        RenderModal,
    };
};

export default useModal;
