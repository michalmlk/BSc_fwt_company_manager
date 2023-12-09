import { Employee, employeeSchema } from '../common/model';
import { toast } from 'react-toastify';
import { ManagerService } from '../services/EmployeeService';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const useEmployeeForm = ({ onClose, currentEmployee }: { onClose: () => void; currentEmployee: any }) => {
    const managerService = new ManagerService();
    const queryClient = useQueryClient();

    const defaultValues = {
        firstName: currentEmployee?.firstName || '',
        lastName: currentEmployee?.lastName || '',
        age: currentEmployee?.age || 18,
        phoneNumber: currentEmployee?.phoneNumber || undefined,
        email: currentEmployee?.email || '',
    };

    const {
        reset,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm({ defaultValues, resolver: zodResolver(employeeSchema), reValidateMode: 'onChange' });

    const onSubmit = async (data: Employee, mode: boolean): Promise<void> => {
        if (mode && data) {
            const toastId = toast.loading('Creating employee...');
            try {
                await managerService.createEmployee(data);
                toast.success('Employee successfully created.');
                await queryClient.invalidateQueries(['employees']);
            } catch (e) {
                toast.error('Error at creating employee.');
            }
            reset();
            toast.dismiss(toastId);
        } else {
            const toastId = toast.loading('Updating employee');
            try {
                await managerService.updateEmployee(data.id, data);
                toast.success('Employee successfully updated.');
                await queryClient.invalidateQueries(['employees']);
            } catch (e) {
                toast.error('Failed to update employee');
            }
            toast.dismiss(toastId);
        }
        onClose();
    };

    return {
        onSubmit,
        errors,
        control,
        reset,
        handleSubmit,
        defaultValues,
    };
};

export default useEmployeeForm;
