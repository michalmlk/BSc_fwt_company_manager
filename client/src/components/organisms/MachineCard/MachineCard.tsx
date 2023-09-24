import React, { useEffect, useState } from 'react';
import { Truck, TruckTechnicalState } from '../../../Model';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import format from 'date-fns/format';
import { Employee } from '../../../common/model';
import { useQuery } from '@tanstack/react-query';
import { employeeQuery, employeesLoader } from '../../../loaders/employeesLoader';
import { useLoaderData } from 'react-router-dom';

const MachineCard: React.FC<{ machine: Truck; onManage: () => void }> = ({ machine, onManage }) => {
    const [currentUser, setCurrentUser] = useState<Employee | undefined>();
    const initialEmployeeData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof employeesLoader>>>;
    const { data } = useQuery({
        ...employeeQuery(),
        initialData: initialEmployeeData,
    });

    useEffect(() => {
        if (data) {
            setCurrentUser(data.find((employee) => employee.truckId === machine.id));
        }
    }, [data, machine.id]);

    const header = (
        <div className="p-6">
            <img
                alt="truck"
                src={
                    'https://img.freepik.com/free-photo/3d-render-cargo-delivery-truck_1048-5605.jpg?w=1380&t=st=1694870739~exp=1694871339~hmac=91e29ea230548d170615e814da9f866a438636c0c52f150d491d29993f975277'
                }
            />
        </div>
    );

    const footer = (
        <div className="flex justify-content-between gap-3">
            <Tag
                severity={
                    machine.techState === TruckTechnicalState.AVAILABLE
                        ? 'success'
                        : machine.techState === TruckTechnicalState.DELIVERY
                        ? 'info'
                        : 'danger'
                }
            >
                {machine.techState === TruckTechnicalState.AVAILABLE
                    ? 'Available'
                    : machine.techState === TruckTechnicalState.DELIVERY
                    ? 'In delivery'
                    : 'In service'}
            </Tag>
            <Button label="Manage" icon="pi pi-check" severity="secondary" onClick={onManage} />
        </div>
    );

    return (
        <Card
            className="flex flex-column w-25rem"
            title={machine.model}
            subTitle={machine.registrationNumber}
            footer={footer}
            header={header}
        >
            <div className="flex flex-column w-12 gap-1">
                <p
                    style={{
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '0.75rem',
                    }}
                >
                    <strong>Assignment: </strong>
                    {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Nobody'}
                </p>
                <p
                    style={{
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '0.75rem',
                    }}
                >
                    <strong>Next tech review: </strong>
                    {format(new Date(machine.techReviewDate!), 'yyyy-MM-dd')}
                </p>
            </div>
        </Card>
    );
};

export default MachineCard;
