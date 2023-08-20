import React from 'react';
import { Employee } from '../../../common/model';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ManagerService } from '../../../services/ManagerService';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const EmployeeCard: React.FC<{ data: Employee }> = (props: { data: Employee }) => {
    const service = new ManagerService();
    const queryClient = useQueryClient();
    //TODO move to the separate provider
    const deleteEmployee = async (id: number) => {
        const toastId = toast.loading('Deleting user...');
        try {
            await service.deleteEmployee(id);
            await queryClient.invalidateQueries(['employees']);
            toast.success('Delete successfull');
        } catch (e: any) {
            toast.error('Failed to delete employee');
        }
        toast.dismiss(toastId);
    };

    return (
        <Card title={`${props.data.firstName} ${props.data.lastName}`}>
            <div className="flex flex-column w-12"></div>
            {props.data.lastName}
            <Button onClick={() => deleteEmployee(props.data.id)} label="Delete" />
        </Card>
    );
};

export default EmployeeCard;
