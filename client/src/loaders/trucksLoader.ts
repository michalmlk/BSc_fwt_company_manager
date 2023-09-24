import { Truck } from '../Model';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const trucksQuery = () => ({
    queryKey: ['trucks'],
    queryFn: async (): Promise<Truck[] | undefined> => {
        const { data } = await axios.get('http://localhost:3001/truck/getAllTrucks');
        return data;
    },
});

export const trucksLoader = (queryClient: QueryClient) => async () => {
    const query = trucksQuery();
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
