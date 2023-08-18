import React from 'react';
import { ManagerService } from '../../../../services/ManagerService';
import EmployeeCard from '../../../organisms/EmployeeCard/EmployeeCard';
import { EmployeeData } from '../EmployeePage';
import { useQuery } from '@tanstack/react-query';

const EmployeeGrid: React.FC<{}> = () => {
    const managerService = new ManagerService();

    const { data } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => await managerService.getAllEmployees(),
    });

    return (
        <div className="flex flex-wrap w-12 gap-4 p-4">
            {data && data.data.map((data: EmployeeData) => <EmployeeCard data={data} />)}
        </div>
    );
};

export default EmployeeGrid;
