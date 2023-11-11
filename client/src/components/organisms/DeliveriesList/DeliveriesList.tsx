import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import { useLoaderData } from 'react-router-dom';
import { deliveriesLoader, deliveriesQuery } from '../../../loaders/deliveriesLoader';
import DeliveryCard from '../DeliveryCard/DeliveryCard';
import { Delivery } from '../../../common/model';

const DeliveriesListWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
`;

const DeliveriesList: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof deliveriesLoader>>>;
    const { data: deliveries } = useQuery({
        ...deliveriesQuery(),
        initialData,
    });
    return (
        <DeliveriesListWrapper>
            {deliveries && deliveries.map((data: Delivery) => <DeliveryCard key={data.id} delivery={data} />)}
        </DeliveriesListWrapper>
    );
};

export default DeliveriesList;
