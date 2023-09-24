import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActionBar } from '../../atoms/ActionBar';
import MachineCard from '../../organisms/MachineCard/MachineCard';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal/Modal';
import AddTruckModalContent from '../../organisms/Modal/AddTruckModal/AddTruckModalContent';
import { trucksLoader, trucksQuery } from '../../../loaders/trucksLoader';
import { useLoaderData } from 'react-router-dom';

const MachineParkPage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof trucksLoader>>>;
    const { data: machines } = useQuery({
        ...trucksQuery(),
        initialData,
    });

    const {
        isModalOpen: isAddTruckModalOpen,
        handleModalClose: handleAddTruckModalClose,
        handleModalOpen: handleAddTruckModalOpen,
    } = useModal(false);

    const {
        isModalOpen: isManageTruckModalOpen,
        handleModalClose: handleManageTruckModalClose,
        handleModalOpen: handleManageTruckModalOpen,
    } = useModal(false);

    const AddTruckModal = useMemo(() => {
        return (
            <Modal title="Add truck" onClose={handleAddTruckModalClose} renderFooter={false} classNames="w-3">
                <AddTruckModalContent selectedTruck={undefined} onClose={handleAddTruckModalClose} />
            </Modal>
        );
    }, [handleAddTruckModalClose]);

    const ManageTruckModal = useMemo(() => {
        return (
            <Modal title="Manage truck" onClose={handleManageTruckModalClose} renderFooter classNames="w-3">
                <h1>"MANAGEEEEEE"</h1>
            </Modal>
        );
    }, [handleAddTruckModalClose]);

    return (
        <div className="flex flex-column w-full relative px-6">
            {isAddTruckModalOpen && AddTruckModal}
            {isManageTruckModalOpen && ManageTruckModal}
            <ActionBar onAdd={handleAddTruckModalOpen} label="Add truck" icon="pi pi-plus" />
            <div className="flex p-6 justify-content-center">
                <div className="flex flex-wrap gap-4">
                    {machines.map((d) => (
                        <MachineCard machine={d} key={d.id} onManage={handleManageTruckModalOpen} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MachineParkPage;
