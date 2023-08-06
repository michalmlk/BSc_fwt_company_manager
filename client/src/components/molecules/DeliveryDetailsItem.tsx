import React from 'react';
import { Card } from 'primereact/card';
import { Delivery } from '../../Model';
import { Button } from 'primereact/button';
import { ManagerService } from '../../services/ManagerService';

const DeliveryDetailsItem: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const managerService = new ManagerService();
    const {
        firstName,
        lastName,
        truck: { model },
    } = delivery.driver;
    return (
        <Card style={{ gridArea: 'details' }}>
            <h2>Driver profile</h2>
            <p>
                Name: {firstName} {lastName}
            </p>
            <p>Truck: {model}</p>
            <Button onClick={() => managerService.updateEmployee(2, { lastName: 'test lastName' })}>
                Full details
            </Button>
        </Card>
    );
};

export default DeliveryDetailsItem;
