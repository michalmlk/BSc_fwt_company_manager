import { Delivery } from '../common/model';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const deliveriesQuery = () => ({
    queryKey: ['deliveries'],
    queryFn: async (): Promise<Delivery[] | undefined> => {
        const { data } = await axios.get('http://localhost:3001/delivery/getDeliveries');
        return data;
    },
});

export const deliveriesLoader = (queryClient: QueryClient) => async () => {
    const query = deliveriesQuery();
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
