import React, { useMemo } from 'react';
import DeliveriesList from '../../organisms/DeliveriesList/DeliveriesList';
import { ActionBar } from '../../atoms/ActionBar';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal/Modal';
import DeliveryModalContent from '../../organisms/Modal/DeliveryModal/DeliveryModalContent';
import { ModalMode } from '../../../Model';

const DeliveriesPage: React.FC = () => {
    const {
        isModalOpen: isCreateDeliveryModalOpen,
        handleModalOpen: handleCreateDeliveryModalOpen,
        handleModalClose: handleCreateDeliveryModalClose,
    } = useModal(false);

    const CreateDeliveryModal = useMemo(() => {
        return (
            <Modal
                title="Create delivery"
                onClose={handleCreateDeliveryModalClose}
                renderFooter={false}
                classNames="w-5"
            >
                <DeliveryModalContent mode={ModalMode.CREATE} onClose={handleCreateDeliveryModalClose} />
            </Modal>
        );
    }, [handleCreateDeliveryModalClose]);

    return (
        <div className="flex flex-column w-12 relative">
            {isCreateDeliveryModalOpen && CreateDeliveryModal}
            <ActionBar onAdd={handleCreateDeliveryModalOpen} label="Create delivery" icon="pi pi-plus" />
            <DeliveriesList />
        </div>
    );
};

export default DeliveriesPage;
