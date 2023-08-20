import React from 'react';
import { ManagerService } from '../../../../services/ManagerService';
import EmployeeCard from '../../../organisms/EmployeeCard/EmployeeCard';
import { Employee } from '../../../../common/model';
import { useQuery } from '@tanstack/react-query';

const EmployeeGrid: React.FC<{}> = () => {
    const managerService = new ManagerService();

    const { data } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            return await managerService.getAllEmployees();
        },
    });

    return (
        <div className="flex flex-wrap w-12 gap-4 p-4">
            {data && data.map((data: Employee) => <EmployeeCard key={data.id} data={data} />)}
        </div>
    );
};

export default EmployeeGrid;
