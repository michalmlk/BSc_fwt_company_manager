import React from 'react';
import { EmployeeData } from '../../pages/EmployeePage/EmployeePage';
import { Card } from 'primereact/card';

const EmployeeCard: React.FC<{ data: EmployeeData }> = (props: { data: EmployeeData }) => {
    return (
        <Card title={`${props.data.firstName} ${props.data.lastName}`}>
            <div className="flex flex-column w-12"></div>
            {props.data.lastName}
        </Card>
    );
};

export default EmployeeCard;
