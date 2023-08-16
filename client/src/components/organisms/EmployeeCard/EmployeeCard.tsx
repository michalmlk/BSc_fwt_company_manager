import React from 'react';
import { EmployeeData } from '../../pages/EmployeePage/EmployeePage';
import { Card } from 'primereact/card';

const EmployeeCard: React.FC<EmployeeData> = (props: EmployeeData) => {
    return <Card title={props.data.firstName}>{props.data.lastName}</Card>;
};

export default EmployeeCard;
