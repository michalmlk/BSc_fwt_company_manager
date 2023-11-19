import React, { useEffect, useMemo, useState } from 'react';
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
import useModal from '../../../hooks/useModal';
import Modal from '../Modal/Modal/Modal';
import { useQueryClient } from '@tanstack/react-query';
import { DeliveryStep } from '../../../Model';

const DeliveryCard: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const { product, employeeId, deadLine, destination, startPoint, currentStep, id } = delivery;

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
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleEditMode = () => {
        setIsReadonly((prev) => !prev);
    };

    const queryClient = useQueryClient();

    const handleCommitStatusChange = async (index: number) => {
        const toastId = toast.loading('Updating status');
        try {
            await service.commitStatusChange(id, index);
            setIsReadonly(true);
            toast.success('Update successful.');
            await queryClient.invalidateQueries(['deliveries']);
        } catch (e) {
            toast.error('Update failed.');
        }
        toast.dismiss(toastId);
    };

    const handleRemoveDelivery = async (id: number) => {
        const toastId = toast.loading('Deleting delivery...');
        try {
            if (currentStep !== DeliveryStep.FINALIZED) {
                toast.error('Could not remove delivery which is not finalized.');
                handleModalClose();
            } else {
                await service.removeDelivery(id);
                await queryClient.invalidateQueries(['deliveries']);
                toast.success('Delivery successfully removed');
            }
        } catch (e) {
            toast.error('Failed to remove delivery');
        }
        toast.dismiss(toastId);
    };

    const { isModalOpen, handleModalOpen, handleModalClose } = useModal(false);
    const ConfirmDeleteDeliveryModal = useMemo(
        () => (
            <Modal title="Confirmation required" onClose={handleModalClose} renderFooter={false}>
                <p>Are you sure you want to remove delivery? This operation could not be reverted.</p>
                <div className="flex justify-content-between mx-2">
                    <Button
                        onClick={handleModalClose}
                        label="Cancel"
                        icon="pi pi-times"
                        outlined
                        severity="secondary"
                    />
                    <Button
                        onClick={async () => await handleRemoveDelivery(id)}
                        label="Delete"
                        icon="pi pi-check"
                        severity="danger"
                    />
                </div>
            </Modal>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [id, delivery]
    );

    return (
        <Card title={`Destination: ${destination}`}>
            {isModalOpen && ConfirmDeleteDeliveryModal}
            <div className="flex justify-content-between align-items-start">
                <DeliveryDetails
                    id={id}
                    deadLine={deadLine}
                    startPoint={startPoint}
                    currentStep={currentStep}
                    product={product}
                    employee={employee!}
                    truck={truck!}
                />
                <Button
                    onClick={handleModalOpen}
                    icon="pi pi-times"
                    tooltip="Remove delivery"
                    severity="danger"
                    tooltipOptions={{
                        position: 'left',
                    }}
                />
            </div>
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
