import { ManagerService } from '../services/ManagerService';
import { Employee } from '../common/model';
import { QueryClient } from '@tanstack/react-query';

const managerService = new ManagerService();

export const employeeQuery = () => ({
    queryKey: ['employees'],
    queryFn: async (): Promise<Employee[] | undefined> => await managerService.getAllEmployees(),
});

export const employeesLoader = (queryClient: QueryClient) => async () => {
    const query = employeeQuery();

    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
