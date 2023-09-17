import React from 'react';
import { Truck, TruckTechnicalState } from '../../../Model';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import format from 'date-fns/format';

const MachineCard: React.FC = ({ machine }: { machine: Truck }) => {
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
            <Button label="Manage" icon="pi pi-check" severity="secondary" />
        </div>
    );

    return (
        <Card
            className="flex flex-column w-3"
            title={machine.model}
            subTitle={machine.registrationNumber}
            footer={footer}
        >
            <div className="flex flex-column w-12">
                <div className="w-12 p-6">
                    <img
                        src={
                            'https://img.freepik.com/free-photo/3d-render-cargo-delivery-truck_1048-5605.jpg?w=1380&t=st=1694870739~exp=1694871339~hmac=91e29ea230548d170615e814da9f866a438636c0c52f150d491d29993f975277'
                        }
                        alt="truck_image"
                        style={{
                            width: '100%',
                        }}
                    />
                </div>
                <Card className="flex flex w-12" title="Details">
                    <p>Assigned employee: {machine.EmployeeId || 'none'}</p>
                    <p>Next tech review: {format(new Date(machine.techReviewDate), 'yyyy-MM-dd')}</p>
                </Card>
            </div>
        </Card>
    );
};

export default MachineCard;
