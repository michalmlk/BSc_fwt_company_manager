import React, { Dispatch, SetStateAction, useState } from 'react';
import { ManagerService } from '../../../services/EmployeeService';
import { Employee } from '../../../common/model';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import useModal from '../../../hooks/useModal';
import Modal from '../Modal/Modal/Modal';
import AssignTruckModalContent from '../Modal/AssignTruckModal/AssignTruckModalContent';
import { useLoaderData } from 'react-router-dom';
import { employeeQuery, employeesLoader } from '../../../loaders/employeesLoader';
import { trucksLoader, trucksQuery } from '../../../loaders/trucksLoader';

interface EmployeeGridProps {
    onEditEmployee: () => void;
    onDataSet: Dispatch<SetStateAction<Employee | undefined>>;
}

const EmployeeGrid: React.FC<EmployeeGridProps> = ({ onEditEmployee, onDataSet }) => {
    const service = new ManagerService();
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [employeeData, setEmployeeData] = useState<Employee>();
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        currentDeliveryId: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const initialEmployeeData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof employeesLoader>>>;

    const initialTrucksData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof trucksLoader>>>;

    const { data: employees } = useQuery({
        ...employeeQuery(),
        initialData: initialEmployeeData,
    });

    const { data: trucks } = useQuery({
        ...trucksQuery(),
        initialData: initialTrucksData,
    });

    const {
        isModalOpen: isDeleteEmployeeModalOpen,
        handleModalOpen: handleDeleteEmployeeModalOpen,
        handleModalClose: handleDeleteEmployeeModalClose,
        RenderModal: renderDeleteEmployeeModal,
    } = useModal();

    const { handleModalOpen: handleEmployeeFormModalOpen } = useModal();

    const {
        isModalOpen: isAssignTruckModalOpen,
        handleModalOpen: handleAssignTruckModalOpen,
        handleModalClose: handleAssignTruckModalClose,
        RenderModal: renderAssignTruckModal,
    } = useModal();

    const DeleteEmployeeModal = React.useMemo(() => {
        const currentTruck = trucks && trucks.find((t) => t.id === employeeData?.truckId);

        return renderDeleteEmployeeModal(
            employeeData && (
                <Modal
                    title="Delete Employee"
                    onClose={handleDeleteEmployeeModalClose}
                    onConfirm={async () => {
                        await onRowDelete(employeeData!.id);
                        handleDeleteEmployeeModalClose();
                    }}
                    type="button"
                    label="Delete"
                    icon="pi pi-trash"
                    renderFooter
                >
                    <h3>Are you sure you want to delete employee?</h3>
                    <div>
                        <p>First name: {employeeData.firstName}</p>
                        <p>Last name: {employeeData.lastName}</p>
                        <p>
                            Truck ID:{' '}
                            {currentTruck
                                ? `${currentTruck?.model} (${currentTruck?.registrationNumber})`
                                : 'No truck assigned'}
                        </p>
                    </div>
                </Modal>
            )
        );
    }, [handleDeleteEmployeeModalClose, trucks]);

    const AssignTruckModal = React.useMemo(() => {
        return renderAssignTruckModal(
            <Modal
                title="Assign truck"
                onClose={handleAssignTruckModalClose}
                type="button"
                label="Assign"
                icon="pi pi-check"
                renderFooter={false}
            >
                <AssignTruckModalContent employee={employeeData} onClose={handleAssignTruckModalClose} />
            </Modal>
        );
    }, [handleAssignTruckModalClose, employeeData]);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="text-xl text-900 font-bold">Employees</span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const truckColumnTemplate = (data: Employee): JSX.Element => {
        //TODO to fix
        const currentTruck = trucks && trucks.find((t) => t.id === data.truckId);
        return currentTruck ? (
            <p>
                {currentTruck.model} ({currentTruck.registrationNumber})
            </p>
        ) : (
            <Tag severity="danger" icon="pi pi-exclamation-circle" value="No truck" />
        );
    };

    const deliveryColumnTemplate = (data: Employee): JSX.Element => (
        <div className="flex justify-content-start">
            {data.currentDeliveryId ? (
                <p>{data.currentDeliveryId}</p>
            ) : (
                <Tag severity="danger" value="No delivery" icon="pi pi-exclamation-circle" />
            )}
        </div>
    );

    const statusColumnTemplate = (data: Employee): JSX.Element => (
        <div className="flex justify-content-start">
            {data.currentDeliveryId ? (
                <Tag severity="info" value="Busy" icon="pi pi-spin pi-spinner" />
            ) : (
                <Tag severity="success" value="Available" icon="pi pi-check" />
            )}
        </div>
    );

    const onRowDelete = async (id: number) => {
        const toastId = toast.loading('Deleting user...');
        try {
            await service.deleteEmployee(id);
            toast.success('Employee successfully deleted');
            await queryClient.invalidateQueries(['employees']);
        } catch (e: any) {
            toast.error('Failed to delete employee.');
        }
        toast.dismiss(toastId);
    };

    const actionsTemplate = (data: Employee): JSX.Element => (
        <div className="flex gap-3 justify-content-end">
            <Button
                icon="pi pi-pencil"
                text
                onClick={() => {
                    setEmployeeData(data);
                    onDataSet(data);
                    onEditEmployee();
                    handleEmployeeFormModalOpen();
                }}
            />
            <Button
                icon="pi pi-truck"
                text
                onClick={() => {
                    setEmployeeData(data);
                    handleAssignTruckModalOpen();
                    console.log(data);
                }}
                disabled={!!data.currentDeliveryId}
            />
            <Button
                icon="pi pi-trash"
                text
                onClick={() => {
                    setEmployeeData(data);
                    handleDeleteEmployeeModalOpen();
                }}
                disabled={!!data.currentDeliveryId}
                //TODO add tooltip
            />
        </div>
    );

    return (
        <div className="flex flex-wrap w-12 gap-4 p-6">
            <DataTable
                value={employees!}
                style={{ width: '100%' }}
                header={() => renderHeader()}
                filters={filters}
                globalFilterFields={['firstName', 'lastName', 'phoneNumber', 'currentDeliveryId', 'truckId']}
            >
                <Column field="firstName" header="First name" />
                <Column field="lastName" header="Last name" />
                <Column field="phoneNumber" header="Phone number" />
                <Column field="email" header="Email" />
                <Column field="truckId" header="Truck" body={truckColumnTemplate} />
                <Column field="currentDeliveryId" header="Delivery Id" body={deliveryColumnTemplate} />
                <Column field="currentDeliveryId" header="Status" body={statusColumnTemplate} />
                <Column body={actionsTemplate} />
            </DataTable>
            {isDeleteEmployeeModalOpen && DeleteEmployeeModal}
            {isAssignTruckModalOpen && AssignTruckModal}
        </div>
    );
};

export default EmployeeGrid;
