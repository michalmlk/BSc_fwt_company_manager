import React, { useEffect, useState } from 'react';
import { Delivery, Employee, Truck } from '../../../common/model';
import { Card } from 'primereact/card';
import { ManagerService } from '../../../services/EmployeeService';
import { TruckService } from '../../../services/TruckService';
import DeliveryDetails from '../../molecules/DeliveryDetails/DeliveryDetails';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { StepsContainer } from './DeliveryCard.styles';
import { DeliveryService } from '../../../services/DeliveriesService';
import { toast } from 'react-toastify';

const DeliveryCard: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const { id, product, employeeId, deadLine, destination, startPoint, currentStep } = delivery;

    const employeeService = new ManagerService();
    const truckService = new TruckService();

    const [employee, setEmployee] = useState<Employee>();
    const [truck, setTruck] = useState<Truck>();
    const [isReadonly, setIsReadonly] = useState(true);
    const [activeIndex, setActiveIndex] = useState(currentStep);
    const service = new DeliveryService();

    const deliveryStatusItems = [
        {
            label: 'Started',
        },
        {
            label: 'Loaded',
        },
        {
            label: 'In progress',
        },
        {
            label: 'Unloaded',
        },
        {
            label: 'Finalized',
        },
    ];

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

    const handleToggleEditMode = () => {
        setIsReadonly((prev) => !prev);
    };

    const handleCommitStatusChange = async (index: number) => {
        const toastId = toast.loading('Updating status');
        try {
            await service.commitStatusChange(id, index);
            setIsReadonly(true);
            toast.success('Update successful.');
        } catch (e) {
            toast.error('Update failed.');
        }
        toast.dismiss(toastId);
    };

    return (
        <Card title={`Destination: ${destination}`}>
            <DeliveryDetails
                deadLine={deadLine}
                startPoint={startPoint}
                currentStep={currentStep}
                product={product}
                employee={employee!}
                truck={truck!}
            />
            <StepsContainer>
                <Steps
                    model={deliveryStatusItems}
                    activeIndex={activeIndex}
                    readOnly={isReadonly}
                    onSelect={(e) => setActiveIndex(e.index)}
                />
                <Button
                    icon={isReadonly ? 'pi pi-pencil' : 'pi pi-check'}
                    tooltip="Change status"
                    tooltipOptions={{ position: 'left' }}
                    onClick={() => (isReadonly ? handleToggleEditMode() : handleCommitStatusChange(activeIndex))}
                />
            </StepsContainer>
        </Card>
    );
};

export default DeliveryCard;
