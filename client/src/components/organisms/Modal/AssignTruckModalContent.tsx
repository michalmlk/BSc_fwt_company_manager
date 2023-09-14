import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ManagerService } from '../../../services/ManagerService';
import { Truck } from '../../../Model';
import { Dropdown } from 'primereact/dropdown';
import { Employee } from '../../../common/model';
import { ModalFooter } from './Modal/Modal';
import { toast } from 'react-toastify';

const AssignTruckModalContent: React.FC<{ employee: Employee | undefined; onClose: () => void }> = ({
    employee,
    onClose,
}) => {
    const service = new ManagerService();
    const [trucks, setTrucks] = useState<Truck[]>([]);
    const [selectedTruck, setSelectedTruck] = useState<Truck | undefined>();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['trucks'],
        queryFn: async (): Promise<Truck[] | undefined> => {
            return await service.getAllTrucks();
        },
    });

    useEffect(() => {
        if (data && employee) {
            console.log(data);
            setTrucks(data.filter((d) => d.driverId == null));
            setSelectedTruck(data.filter((t) => t.id == employee.truckId)[0]);
        }
    }, [data, employee]);

    const handleAssignTruckConfirm = async (): Promise<void> => {
        const toastId = toast.loading(employee?.truckId ? 'Changing truck assignment...' : 'Assigning truck...');
        if (employee && selectedTruck) {
            try {
                await service.updateTruckAssignment(employee.id, selectedTruck.id);
                await queryClient.invalidateQueries(['employees']);
                toast.success('Truck successfully updated.');
                onClose();
            } catch (e) {
                toast.error('Failed to update truck assignment.');
            }
            toast.dismiss(toastId);
        }
    };

    return (
        <>
            <Dropdown
                value={selectedTruck}
                onChange={(e) => setSelectedTruck(trucks.find((t) => t.id === e.value.id))}
                options={trucks}
                optionLabel="model"
                placeholder="Select Truck"
                className="w-12 mb-4"
            />
            <ModalFooter
                onClose={onClose}
                onConfirm={handleAssignTruckConfirm}
                icon="pi pi-plus"
                label="Assign"
                disabled={false}
                type="button"
            />
        </>
    );
};
export default AssignTruckModalContent;
