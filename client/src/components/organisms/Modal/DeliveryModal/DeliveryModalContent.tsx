import React from 'react';
import { ModalMode } from '../../../../Model';
import { ModalFooter } from '../Modal/Modal';
import { DeliveryService } from '../../../../services/DeliveriesService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerService } from '../../../../services/EmployeeService';
import { DeliverySchema, Employee, deliverySchema } from '../../../../common/model';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { zodResolver } from '@hookform/resolvers/zod';

type DeliveryModalContentProps = {
    onClose: () => void;
    mode: ModalMode;
};

const DeliveryModalContent: React.FC<DeliveryModalContentProps> = ({ mode, onClose }): JSX.Element => {
    const label = mode === ModalMode.CREATE ? 'Create' : 'Confirm';
    const icon = mode === ModalMode.CREATE ? 'pi pi-plus' : 'pi pi-check';

    const service = new DeliveryService();
    const employeeService = new ManagerService();
    const queryClient = useQueryClient();

    const [employees, setEmployees] = React.useState<Employee[]>();

    React.useEffect(() => {
        (async () => {
            const data = await employeeService.getAllEmployees();
            setEmployees(data);
        })();
    }, []);

    const defaultValues: DeliverySchema = {
        product: '',
        deadLine: new Date(),
        destination: '',
        startPoint: '',
        employeeId: null,
        currentStep: 0,
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

    const mutation = useMutation({
        mutationFn: async (data: DeliverySchema) => {
            await service.createDelivery(data);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries(['deliveries']);
            reset();
            onClose();
        },
    });

    const getFormErrorMessage = (name: string) => (
        <small className="p-error">{errors[name] ? `${errors[name]?.message}` : ''}</small>
    );

    const onSubmit = async (data: any) => {
        const toastId = toast.loading('Creating delivery');
        try {
            await mutation.mutateAsync({
                ...data,
                currentStep: 0,
            });
            toast.success('Delivery successfully created.');
        } catch (e) {
            toast.error('Creation failed.');
        }
        toast.dismiss(toastId);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Controller
                    name="product"
                    control={control}
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
                            />
                            <label
                                htmlFor={field.name}
                                className={classNames({
                                    'p-error': fieldState.error,
                                })}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="startPoint"
                    control={control}
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
                            />
                            <label
                                htmlFor={field.name}
                                className={classNames({
                                    'p-error': fieldState.error,
                                })}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="destination"
                    control={control}
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
                            />
                            <label
                                htmlFor={field.name}
                                className={classNames({
                                    'p-error': fieldState.error,
                                })}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="deadLine"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Due</label>
                            <Calendar
                                inputId={field.name}
                                value={field.value}
                                className={classNames({
                                    'p-invalid': fieldState.error,
                                })}
                                onChange={field.onChange}
                                dateFormat="dd-m-yy"
                                showIcon
                                showButtonBar
                            />
                        </>
                    )}
                />
                <Controller
                    name="employeeId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Employee</label>
                            <Dropdown
                                options={
                                    employees
                                        ? employees
                                              .filter((e) => !e.currentDeliveryId && e.truckId)
                                              .map((e) => ({ name: `${e.firstName} ${e.lastName}`, value: e.id }))
                                        : []
                                }
                                optionLabel="name"
                                id={field.name}
                                value={field.value}
                                className={classNames({
                                    'p-invalid': fieldState.error,
                                })}
                                onChange={(e) => field.onChange(e.value)}
                                placeholder="Select employee"
                                focusInputRef={field.ref}
                            />
                            <label
                                htmlFor={field.name}
                                className={classNames({
                                    'p-error': fieldState.error,
                                })}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <ModalFooter onClose={onClose} icon={icon} label={label} disabled={false} type="submit"></ModalFooter>
            </form>
        </>
    );
};

export default DeliveryModalContent;
