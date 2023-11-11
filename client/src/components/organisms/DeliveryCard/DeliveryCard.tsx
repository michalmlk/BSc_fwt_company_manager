import React, { useEffect, useState } from 'react';
import { Delivery, Employee, EmployeeSchema, Truck } from '../../../common/model';
import { Card } from 'primereact/card';
import { ManagerService } from '../../../services/EmployeeService';
import { TruckService } from '../../../services/TruckService';

const DeliveryCard: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const { id, product, employeeId, deadLine, destination, startPoint, currentStep } = delivery;

    const employeeService = new ManagerService();
    const truckService = new TruckService();

    const [employee, setEmployee] = useState<EmployeeSchema>();
    const [truck, setTruck] = useState<Truck>();

    useEffect(() => {
        const handleGetData = async () => {
            const employeeData = await employeeService.getEmployee(employeeId);
            if (employeeData) {
                setEmployee(employeeData);
                const truckData = await truckService.getTruck(employeeData.truckId!);
                setTruck(truckData);
            }
        };
        handleGetData();
    }, []);

    return (
        <Card title={`Destination: ${destination}`}>
            {truck?.id} {employee?.age}
        </Card>
    );
};

export default DeliveryCard;
