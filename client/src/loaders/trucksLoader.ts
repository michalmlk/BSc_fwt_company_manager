import { Truck } from '../Model';
import { QueryClient } from '@tanstack/react-query';
import { TruckService } from '../services/TruckService';

const truckService = new TruckService();

export const trucksQuery = () => ({
    queryKey: ['trucks'],
    queryFn: async (): Promise<Truck[] | undefined> => await truckService.getAllTrucks(),
});

export const trucksLoader = (queryClient: QueryClient) => async () => {
    const query = trucksQuery();
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
