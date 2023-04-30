import React from 'react';
import { Card } from 'primereact/card';
import { Delivery } from '../../Model';
import { Button } from 'primereact/button';

const DeliveryDetailsItem: React.FC = ({ delivery }: { delivery: Delivery }) => {
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
            <Button>Full details</Button>
        </Card>
    );
};

export default DeliveryDetailsItem;
