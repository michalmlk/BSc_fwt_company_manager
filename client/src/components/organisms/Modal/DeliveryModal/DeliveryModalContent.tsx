import { useEffect, useState } from 'react';
import { ModalMode } from '../../../../Model';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { ModalFooter } from '../Modal/Modal';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Delivery, DeliverySchema, Employee, deliverySchema } from '../../../../common/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeliveryService } from '../../../../services/DeliveriesService';
import { toast } from 'react-toastify';
import { Button } from 'primereact/button';
import { ManagerService } from '../../../../services/EmployeeService';

const DeliveryModalContent: ({
    selectedDelivery,
    onClose,
    mode,
}: {
    selectedDelivery: Delivery | undefined;
    onClose: () => void;
    mode: ModalMode;
}) => void = ({ onClose, mode }): JSX.Element => {
    const selectedDelivery = {};
    const defaultValues = {
        product: selectedDelivery ? selectedDelivery.product : '',
        deadLine: selectedDelivery && selectedDelivery.deadLine ? new Date(selectedDelivery.deadLine) : new Date(),
        destination: selectedDelivery ? selectedDelivery.destination : '',
        startPoint: selectedDelivery ? selectedDelivery.startPoint : '',
        employeeId: selectedDelivery ? selectedDelivery.employeeId : '',
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(deliverySchema),
        reValidateMode: 'onChange',
    });

    const getFormErrorMessage = (name) => {
        return errors[name] ? (
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    const service = new DeliveryService();
    const queryClient = useQueryClient();
    const employeeService = new ManagerService();

    const [employees, setEmployees] = useState<Employee[]>();

    useEffect(() => {
        (async () => {
            console.log('fetching');
            const data = await employeeService.getAllEmployees();
            setEmployees(data);
        })();
    }, []);

    const mutation = useMutation({
        //ts-ignore
        mutationFn: async (data: DeliverySchema) => {
            console.log('test');
            mode === ModalMode.CREATE
                ? await service.createDelivery(data)
                : await service.updateDelivery(data, selectedDelivery!.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['deliveries']);
            reset();
            onClose();
        },
    });

    const onSubmit = async (data) => {
        console.log('test onsubmit');
        const toastId = toast.loading('Creating delivery...');
        try {
            await mutation.mutateAsync(data);
            toast.success(`Delivery successfully ${mode === ModalMode.CREATE ? 'created' : 'updated'}.`);
        } catch (e) {
            toast.error(`Error on ${mode === ModalMode.CREATE ? 'create' : 'updating'} action.`);
        }
        toast.dismiss(toastId);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-1">
            {/* start point */}
            <Controller
                name="startPoint"
                control={control}
                rules={{ required: 'Start point is required.' }}
                render={({ field, fieldState }) => (
                    <>
                        <label htmlFor={field.name}>Start point</label>
                        <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({
                                'p-invalid': fieldState.error,
                            })}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="Start point"
                        />
                        <label
                            htmlFor={field.name}
                            className={classNames({
                                'p-error': errors.value,
                            })}
                        />
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />
            {/* destination */}
            <Controller
                name="destination"
                control={control}
                rules={{ required: 'Destination is required.' }}
                render={({ field, fieldState }) => (
                    <>
                        <label htmlFor={field.name}>Destination</label>
                        <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({
                                'p-invalid': fieldState.error,
                            })}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="Destination"
                        />
                        <label
                            htmlFor={field.name}
                            className={classNames({
                                'p-error': errors.value,
                            })}
                        />
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />
            {/*product*/}
            <Controller
                name="product"
                control={control}
                rules={{ required: 'Product is required.' }}
                render={({ field, fieldState }) => (
                    <>
                        <label htmlFor={field.name}>Product</label>
                        <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({
                                'p-invalid': fieldState.error,
                            })}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="Product"
                        />
                        <label
                            htmlFor={field.name}
                            className={classNames({
                                'p-error': errors.value,
                            })}
                        />
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />
            {/*deadline*/}
            <Controller
                name="deadLine"
                control={control}
                rules={{ required: mode === ModalMode.CREATE }}
                render={({ field, fieldState }) => (
                    <>
                        <label htmlFor={field.name}>Due date</label>
                        <Calendar
                            inputId={field.name}
                            value={field.value || new Date()}
                            onChange={field.onChange}
                            dateFormat="dd-m-yy"
                            showIcon
                            showButtonBar
                            className={classNames({
                                'p-invalid': fieldState.error,
                            })}
                        />
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />
            {/* employee */}
            <Controller
                name="employeeId"
                control={control}
                rules={{ required: 'Employee is required.' }}
                render={({ field, fieldState }) => (
                    <>
                        <label htmlFor={field.name}>Employee</label>
                        <Dropdown
                            id={field.name}
                            value={field.value}
                            optionLabel="name"
                            placeholder="Select employee"
                            options={
                                employees
                                    ? employees.map((e) => ({ name: `${e.firstName} ${e.lastName}`, value: e.id }))
                                    : []
                            }
                            focusInputRef={field.ref}
                            onChange={(e) => field.onChange(e.value)}
                            className={classNames({
                                'p-invalid': fieldState.error,
                            })}
                        />
                        <label
                            htmlFor={field.name}
                            className={classNames({
                                'p-error': errors.value,
                            })}
                        />
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />
            {mode === ModalMode.CREATE ? (
                <ModalFooter onClose={onClose} icon="pi pi-plus" label="Create" disabled={false} type="submit" />
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
                    <Button type="button" icon="pi pi-check" label="Update" onClick={() => console.log('test')} />
                </div>
            )}
            <button type="submit">X</button>
        </form>
    );
};

export default DeliveryModalContent;
