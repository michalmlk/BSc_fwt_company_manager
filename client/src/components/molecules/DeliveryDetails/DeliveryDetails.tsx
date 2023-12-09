import React from 'react';
import { StyledDetails } from './DeliveryDetails.styles';
import { format } from 'date-fns';
import { Employee, Truck } from '../../../common/model';

type DeliveryDetailsProps = {
    deadLine: Date;
    startPoint: string;
    product: string;
    currentStep: number;
    employee: Employee;
    truck: Truck;
    id: number;
};

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
    deadLine,
    startPoint,
    product,
    employee,
    truck,
}): JSX.Element => {
    return (
        <StyledDetails>
            <h3>Product: {product}</h3>
            <p>Start point: {startPoint}</p>
            <p>Due: {format(new Date(deadLine), 'dd-MM-yyyy')}</p>
            <p>Employee: {employee && `${employee.firstName} ${employee.lastName}`}</p>
            <p>Truck reg. number: {truck && truck.registrationNumber}</p>
        </StyledDetails>
    );
};

export default DeliveryDetails;
