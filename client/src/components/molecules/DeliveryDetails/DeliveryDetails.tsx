import React from 'react';
import { StyledDetails } from './DeliveryDetails.styles';
import { format } from 'date-fns';

type DeliveryDetailsProps = {
    deadLine: Date;
    startPoint: string;
    product: string;
    currentStep: number;
};

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ deadLine, startPoint, product }): JSX.Element => {
    return (
        <StyledDetails>
            <h3>Product: {product}</h3>
            <p>Start point: {startPoint}</p>
            <p>Due: {format(new Date(deadLine), 'dd-MM-yyyy')}</p>
        </StyledDetails>
    );
};

export default DeliveryDetails;
