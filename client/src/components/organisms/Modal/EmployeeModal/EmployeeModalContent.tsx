import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { ModalMode } from '../../../../Model';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee, EmployeeSchema, employeeSchema } from '../../../../common/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerService } from '../../../../services/EmployeeService';
import { toast } from 'react-toastify';
import { ModalFooter } from '../Modal/Modal';
import { Button } from 'primereact/button';

const EmployeeModalContent: React.FC<{
    onClose: () => void;
    mode: ModalMode;
    currentEmployee: Employee | undefined;
}> = ({ onClose, mode, currentEmployee }): JSX.Element => {
    const defaultValues = {
        firstName: currentEmployee?.firstName || '',
        lastName: currentEmployee?.lastName || '',
        age: currentEmployee?.age || 18,
        phoneNumber: currentEmployee?.phoneNumber ? currentEmployee.phoneNumber.toString() : undefined,
        email: currentEmployee?.email || '',
    };

    const {
        reset,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm({ defaultValues, resolver: zodResolver(employeeSchema), reValidateMode: 'onChange' });

    const getFormErrorMessage = (name: string) => {
        return errors[name] ? (
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    const managerService = new ManagerService();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        //ts-ignore
        mutationFn: async (data: EmployeeSchema) => {
            mode === ModalMode.CREATE
                ? await managerService.createEmployee(data)
                : await managerService.updateEmployee(data, currentEmployee!.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
            reset();
            onClose();
        },
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading(mode === ModalMode.CREATE ? 'Creating employee' : 'Updating employee');
        try {
            await mutation.mutateAsync(data);
            toast.success(`Employee successfully ${mode === ModalMode.CREATE ? 'added' : 'updated'}.`);
        } catch (e) {
            toast.error(`Error on ${mode === ModalMode.CREATE ? 'adding' : 'updating'} employee action.`);
        }
        toast.dismiss(toastId);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-column gap-1">
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>First name</label>
                            <InputText
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                placeholder="First name"
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Last name</label>
                            <InputText
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                placeholder="Last name"
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="age"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor="age">Age</label>
                            <InputNumber
                                id={field.name}
                                inputRef={field.ref}
                                value={field.value}
                                onBlur={field.onBlur}
                                onValueChange={(e) => field.onChange(e)}
                                useGrouping={false}
                                placeholder="Age"
                                inputClassName={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Phone number</label>
                            <InputText
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                placeholder="Phone number"
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Email</label>
                            <InputText
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                placeholder="Email"
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </div>
            {mode === ModalMode.CREATE ? (
                <ModalFooter onClose={onClose} icon="pi pi-plus" label="Add" disabled={false} type="submit" />
            ) : (
                <div className="flex justify-content-between gap-2">
                    <Button
                        type="button"
                        icon="pi pi-times"
                        label="Cancel"
                        severity="secondary"
                        outlined
                        onClick={onClose}
                    />
                    <Button type="submit" icon="pi pi-check" label="Update" />
                </div>
            )}
        </form>
    );
};

export default EmployeeModalContent;
