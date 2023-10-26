import { Employee } from '../common/model';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const employeeQuery = () => ({
    queryKey: ['employees'],
    queryFn: async (): Promise<Employee[] | undefined> => {
        const { data } = await axios.get(`http://localhost:3001/employee/getAllEmployees`);
        return data;
    },
});

export const employeesLoader = (queryClient: QueryClient) => async () => {
    const query = employeeQuery();
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
