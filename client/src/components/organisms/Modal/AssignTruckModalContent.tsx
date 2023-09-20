import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ManagerService } from '../../../services/ManagerService';
import { Truck, TruckTechnicalState } from '../../../Model';
import { Employee } from '../../../common/model';
import { ModalFooter } from './Modal/Modal';
import { toast } from 'react-toastify';
import { DataTable, DataTableDataSelectableEvent, DataTableSelectionChangeEvent } from 'primereact/datatable';
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
            setTrucks(
                data.filter((t) => t.techState === TruckTechnicalState.AVAILABLE && t.EmployeeId !== employee.id)
            );
            setSelectedTruck(data.filter((t) => t.id == employee.truckId)[0]);
        }
    }, [data, employee]);

    const handleAssignTruckConfirm = async (): Promise<void> => {
        const toastId = toast.loading(employee?.truckId ? 'Changing truck assignment...' : 'Assigning truck...');
        if (employee && selectedTruck) {
            try {
                await service.updateTruckAssignment(employee.id, selectedTruck.id);
                await queryClient.invalidateQueries(['trucks']);
                await queryClient.invalidateQueries(['employees']);
                toast.success('Truck successfully updated.');
                onClose();
            } catch (e) {
                toast.error('Failed to update truck assignment.');
            }
            toast.dismiss(toastId);
        }
    };

    const isSelectable = (data: Truck) =>
        data.techState === TruckTechnicalState.AVAILABLE && data.id !== employee?.truckId;

    const isRowSelectable = (e: DataTableDataSelectableEvent<Truck>) => isSelectable(e.data);

    return (
        <>
            <label htmlFor="employeeTruck">Available trucks</label>
            <DataTable
                value={trucks!}
                selectionMode="single"
                selection={selectedTruck}
                onSelectionChange={(e: DataTableSelectionChangeEvent<Truck[]>) => setSelectedTruck(e.value)}
                isDataSelectable={isRowSelectable}
            >
                <Column field="id" header="Truck ID" />
                <Column field="model" header="Model" />
                <Column field="registrationNumber" header="Reg. number" />
                <Column field="techState" header="Status" />
                <Column field="EmployeeId" header="DriverId" />
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
