import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { DeliveriesListWrapper } from './DeliveriesList.styles';
import { useLoaderData } from 'react-router-dom';
import { deliveriesLoader, deliveriesQuery } from '../../../loaders/deliveriesLoader';
import DeliveryCard from '../DeliveryCard/DeliveryCard';
import { Delivery } from '../../../common/model';

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
