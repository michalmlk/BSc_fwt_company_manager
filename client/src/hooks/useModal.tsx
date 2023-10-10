import React, { ReactNode, useEffect } from 'react';

const useModal = (isOpen = false) => {
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
            document.getElementById('root')?.classList.add('root-with-modal')
        }

        return () => {
            document.getElementById('modal-backdrop')?.classList.remove('modal-open');
            document.getElementById('root')?.classList.remove('root-with-modal');
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
