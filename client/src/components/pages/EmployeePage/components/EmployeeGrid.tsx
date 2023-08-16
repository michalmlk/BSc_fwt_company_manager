import React, { useEffect } from 'react';
import { ManagerService } from '../../../../services/ManagerService';
import EmployeeCard from '../../../organisms/EmployeeCard/EmployeeCard';
import { EmployeeData } from '../EmployeePage';

const EmployeeGrid: React.FC<{}> = () => {
    const [employees, setEmployees] = React.useState<Array<EmployeeData>>([]);
    const service = new ManagerService();
    useEffect(() => {
        const data = service.getAllEmployees().then((res) => {
            setEmployees(res.data);
        });
        console.log(data);
    }, []);

    return (
        <div className="flex flex-wrap w-12 gap-4 p-4">
            {employees.map((data: EmployeeData) => (
                <EmployeeCard data={data} />
            ))}
        </div>
    );
};

export default EmployeeGrid;
