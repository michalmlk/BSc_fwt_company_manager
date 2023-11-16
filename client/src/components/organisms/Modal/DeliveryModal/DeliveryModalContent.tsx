import React from 'react';
import { ModalMode } from '../../../../Model';
import { ModalFooter } from '../Modal/Modal';
import { DeliveryService } from '../../../../services/DeliveriesService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerService } from '../../../../services/EmployeeService';
import { DeliverySchema, Employee } from '../../../../common/model';
import { toast } from 'react-toastify';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

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
        employeeId: 0,
        currentStep: 0,
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm(defaultValues);

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

    const onSubmit = async (data: any) => {
        console.log(data);
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
                            <label htmlFor={field.name}>Due</label>
                            <Dropdown
                                options={
                                    employees
                                        ? employees.map((e) => ({ name: `${e.firstName} ${e.lastName}`, value: e.id }))
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
                        </>
                    )}
                />
                <ModalFooter onClose={onClose} icon={icon} label={label} disabled={false} type="submit"></ModalFooter>
            </form>
        </>
    );
};

export default DeliveryModalContent;
