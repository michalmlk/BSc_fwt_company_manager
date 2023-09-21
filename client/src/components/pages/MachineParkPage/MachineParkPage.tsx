import React, { useEffect, useMemo, useState } from 'react';
import { Truck } from '../../../Model';
import { ManagerService } from '../../../services/ManagerService';
import { useQuery } from '@tanstack/react-query';
import { ActionBar } from '../../atoms/ActionBar';
import MachineCard from '../../organisms/MachineCard/MachineCard';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal/Modal';
import AddTruckModalContent from '../../organisms/Modal/AddTruckModal/AddTruckModalContent';

const MachineParkPage: React.FC = () => {
    const service = new ManagerService();
    const [machines, setMachines] = useState<Truck[]>([]);

    const { data } = useQuery({
        queryKey: ['trucks'],
        queryFn: async (): Promise<Truck[] | undefined> => {
            return await service.getAllTrucks();
        },
    });

    useEffect(() => {
        if (data) {
            setMachines(data);
        }
    }, [data]);

    const {
        isModalOpen: isAddTruckModalOpen,
        handleModalClose: handleAddTruckModalClose,
        handleModalOpen: handleAddTruckModalOpen,
    } = useModal(false);

    const AddTruckModal = useMemo(() => {
        return (
            <Modal title="Add truck" onClose={handleAddTruckModalClose} renderFooter={false} classNames="w-3">
                <AddTruckModalContent selectedTruck={undefined} onClose={handleAddTruckModalClose} />
            </Modal>
        );
    }, []);

    return (
        <div className="flex flex-column w-12 relative px-6">
            {isAddTruckModalOpen && AddTruckModal}
            <ActionBar onAdd={handleAddTruckModalOpen} label="Add truck" icon="pi pi-plus" />
            <div className="flex gap-4 p-6">{data && machines.map((d) => <MachineCard machine={d} key={d.id} />)}</div>
        </div>
    );
};

export default MachineParkPage;
