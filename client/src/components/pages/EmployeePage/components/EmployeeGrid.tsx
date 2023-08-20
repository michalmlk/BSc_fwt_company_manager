import React, { useState } from 'react';
import { ManagerService } from '../../../../services/ManagerService';
import { Employee } from '../../../../common/model';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

const EmployeeGrid: React.FC<{}> = () => {
    const managerService = new ManagerService();
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        currentDeliveryId: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

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

    const { data } = useQuery({
        queryKey: ['employees'],
        queryFn: async (): Promise<Employee[] | undefined> => {
            return await managerService.getAllEmployees();
        },
    });

    const truckColumnTemplate = (data: Employee): JSX.Element => {
        return data.truckId ? (
            <p>{data.truckId}</p>
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

    return (
        <div className="flex flex-wrap w-12 gap-4 p-4">
            {data && (
                <DataTable
                    value={data}
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
                </DataTable>
            )}
        </div>
    );
};

export default EmployeeGrid;
