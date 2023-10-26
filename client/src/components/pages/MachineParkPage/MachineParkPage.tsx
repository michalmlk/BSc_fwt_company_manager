import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActionBar } from '../../atoms/ActionBar';
import MachineCard from '../../organisms/MachineCard/MachineCard';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal/Modal';
import TruckModalContent from '../../organisms/Modal/TruckModal/TruckModalContent';
import { trucksLoader, trucksQuery } from '../../../loaders/trucksLoader';
import { useLoaderData } from 'react-router-dom';
import { Truck, TruckModalMode } from '../../../Model';

const MachineParkPage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof trucksLoader>>>;
    const { data: machines } = useQuery({
        ...trucksQuery(),
        initialData,
    });

    const [selectedTruck, setSelectedTruck] = useState<Truck | undefined>(undefined);

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
                <TruckModalContent
                    selectedTruck={undefined}
                    onClose={handleAddTruckModalClose}
                    mode={TruckModalMode.CREATE}
                />
            </Modal>
        );
    }, [handleAddTruckModalClose]);

    const ManageTruckModal = useMemo(() => {
        return (
            <Modal title="Manage truck" onClose={handleManageTruckModalClose} renderFooter={false} classNames="w-3">
                <TruckModalContent
                    selectedTruck={selectedTruck}
                    mode={TruckModalMode.EDIT}
                    onClose={handleManageTruckModalClose}
                />
            </Modal>
        );
    }, [handleAddTruckModalClose, selectedTruck]);

    return (
        <div className="flex flex-column w-full relative px-6">
            {isAddTruckModalOpen && AddTruckModal}
            {isManageTruckModalOpen && ManageTruckModal}
            <ActionBar onAdd={handleAddTruckModalOpen} label="Add truck" icon="pi pi-plus" />
            <div className="flex p-6 justify-content-center">
                <div className="flex flex-wrap gap-4">
                    {machines.map((d) => (
                        <MachineCard
                            machine={d}
                            key={d.id}
                            onManage={async () => {
                                await setSelectedTruck(d);
                                handleManageTruckModalOpen();
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MachineParkPage;
