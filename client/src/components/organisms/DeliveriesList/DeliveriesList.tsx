import React from 'react';
import { deliveries } from '../../../dummydata';
import DeliveryItem from '../DeliveryItem/DeliveryItem';
import styled from 'styled-components';

const DeliveriesListWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
`;

const DeliveriesList: React.FC = () => {
    return (
        <DeliveriesListWrapper>
            {deliveries.map((delivery) => (
                <DeliveryItem key={delivery.id} delivery={delivery} />
            ))}
        </DeliveriesListWrapper>
    );
};

export default DeliveriesList;
