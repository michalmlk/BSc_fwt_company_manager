import React from 'react';

const useModal = (isOpen: boolean = false) => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(isOpen);
    const modalNode = document.createElement('div');
    const modalContent = document.getElementById('modal-content');

    React.useEffect(() => {
        modalContent?.appendChild(modalNode);

        return () => {
            modalContent?.removeChild(modalNode);
        }
    }, [modalNode, isModalOpen]);

    const handleModalOpen = (): void => {
        setIsModalOpen(true);
    }

    const handleModalClose = (): void => {
        setIsModalOpen(false);
    }

    return {
        isModalOpen,
        handleModalOpen,
        handleModalClose,
    }
}

export default useModal;