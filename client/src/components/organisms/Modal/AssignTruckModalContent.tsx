import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ManagerService } from '../../../services/ManagerService';
import { Truck } from '../../../Model';
import { Dropdown } from 'primereact/dropdown';
import { Employee } from '../../../common/model';
import { ModalFooter } from './Modal/Modal';
import { toast } from 'react-toastify';
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AssignTruckModalContent: React.FC<{ employee: Employee | undefined; onClose: () => void }> = ({
    employee,
    onClose,
}) => {
    const service = new ManagerService();
    const [trucks, setTrucks] = useState<Truck[]>([]);
    const [selectedTruck, setSelectedTruck] = useState<Truck | undefined>(undefined);
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
            setTrucks(data);
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
            <label htmlFor="employeeTruck">Available trucks</label>
            <DataTable
                value={trucks!}
                selectionMode="single"
                selection={selectedTruck}
                onSelectionChange={(e: DataTableSelectionChangeEvent<Truck>) => setSelectedTruck(e.value)}
            >
                <Column field="id" header="Code" />
                <Column field="model" header="Name" />
                <Column field="registrationNumber" header="Category" />
                <Column field="techState" header="Quantity" />
            </DataTable>
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
