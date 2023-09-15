import { Employee, employeeSchema } from '../common/model';
import { toast } from 'react-toastify';
import { ManagerService } from '../services/ManagerService';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

enum EmployeeFormMode {
    CREATE,
    EDIT
}

const defaultValues = {
    firstName: '',
    lastName: '',
    age: 18,
    phoneNumber: undefined,
    email: '',
};

const useEmployeeForm = ({ onClose }: { onClose: () => void }) => {

    const managerService = new ManagerService();
    const queryClient = useQueryClient();
    const { reset, formState: { errors }, control, handleSubmit } = useForm({ defaultValues, resolver: zodResolver(employeeSchema), reValidateMode: 'onChange' });

    let mode = 0;

    const onSubmit = async (data: Employee): Promise<void> => {
        if (mode === EmployeeFormMode.CREATE && data) {
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
        }
        if (mode === EmployeeFormMode.EDIT && data?.id) {
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
    }

    return {
        onSubmit,
        errors,
        control,
        reset, handleSubmit
    }
}

export default useEmployeeForm;