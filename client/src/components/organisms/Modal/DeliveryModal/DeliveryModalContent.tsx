import React from 'react';
import { ModalMode } from '../../../../Model';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { ModalFooter } from '../Modal/Modal';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Delivery, DeliverySchema, deliverySchema } from '../../../../common/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeliveryService } from '../../../../services/DeliveriesService';
import { toast } from 'react-toastify';
import { Button } from 'primereact/button';

const DeliveryModalContent: ({
    selectedDelivery,
    onClose,
    mode,
}: {
    selectedDelivery: Delivery | undefined;
    onClose: () => void;
    mode: ModalMode;
}) => void = ({ selectedDelivery, onClose, mode }): JSX.Element => {
    const defaultValues = {
        product: selectedDelivery ? selectedDelivery.product : '',
        deadLine: selectedDelivery ? new Date(selectedDelivery.deadLine) : new Date(),
        destination: selectedDelivery ? selectedDelivery.destination : '',
        startPoint: selectedDelivery ? selectedDelivery.startPoint : '',
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
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

    const mutation = useMutation({
        //ts-ignore
        mutationFn: async (data: DeliverySchema) => {
            // mode === ModalMode.CREATE
            //     ? await service.createDelivery(data)
            //     : await service.updateDelivery(data, selectedDelivery!.id);
            console.log(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['deliveries']);
            reset();
            onClose();
        },
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading('Creating delivery...');
        try {
            await mutation.mutateAsync(data);
            toast.success(`Delivery successfully ${mode === ModalMode.CREATE ? 'added' : 'updated'}.`);
        } catch (e) {
            toast.error(`Error on ${mode === ModalMode.CREATE ? 'adding' : 'updating'} truck action.`);
        }
        toast.dismiss(toastId);
    };
    return (
        <>
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
                {mode === ModalMode.CREATE ? (
                    <ModalFooter onClose={onClose} icon="pi pi-plus" label="Create" disabled={false} type="submit" />
                ) : (
                    <div className="flex justify-content-between">
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
        </>
    );
};

export default DeliveryModalContent;
