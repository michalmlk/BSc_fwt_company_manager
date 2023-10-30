import React from 'react';
import { Truck, TruckModalMode, TruckTechnicalState } from '../../../../Model';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { ModalFooter } from '../Modal/Modal';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { TruckSchema, truckSchema } from '../../../../common/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TruckService } from '../../../../services/TruckService';
import { toast } from 'react-toastify';
import { Button } from 'primereact/button';

const TruckModalContent: ({
    selectedTruck,
    onClose,
    mode,
}: {
    selectedTruck: Truck | undefined;
    onClose: () => void;
    mode: TruckModalMode;
}) => void = ({ selectedTruck, onClose, mode }) => {
    const defaultValues = {
        model: selectedTruck ? selectedTruck.model : '',
        registrationNumber: selectedTruck ? selectedTruck.registrationNumber : '',
        techState: selectedTruck ? selectedTruck.techState : TruckTechnicalState.AVAILABLE,
        techReviewDate: selectedTruck ? new Date(selectedTruck.techReviewDate) : new Date(),
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(truckSchema),
        reValidateMode: 'onChange',
    });

    const getFormErrorMessage = (name) => {
        return errors[name] ? (
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    const truckService = new TruckService();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        //ts-ignore
        mutationFn: async (data: TruckSchema) => {
            mode === TruckModalMode.CREATE
                ? await truckService.addTruck(data)
                : await truckService.updateTruck(data, selectedTruck!.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trucks']);
            reset();
            onClose();
        },
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading('Adding truck...');
        try {
            await mutation.mutateAsync(data);
            toast.success(`Truck successfully ${mode === TruckModalMode.CREATE ? 'added' : 'updated'}.`);
        } catch (e) {
            toast.error(`Error on ${mode === TruckModalMode.CREATE ? 'adding' : 'updating'} truck action.`);
        }
        toast.dismiss(toastId);
    };

    const techStates = [
        {
            name: TruckTechnicalState.AVAILABLE,
            value: TruckTechnicalState.AVAILABLE,
        },
        {
            name: TruckTechnicalState.SERVICE,
            value: TruckTechnicalState.SERVICE,
        },
    ];

    const handleDeleteTruck = async (truckId: number): void => {
        const toastId = toast.loading(`Deleting truck with id: ${truckId}`);
        try {
            await truckService.deleteTruck(truckId);
            await queryClient.invalidateQueries(['trucks']);
            toast.success('Truck successfully deleted.');
            onClose();
        } catch (e) {
            toast.error('Failed to delete truck.');
            console.log(e.message);
        }
        toast.dismiss(toastId);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-1">
                {/*model*/}
                <Controller
                    name="model"
                    control={control}
                    rules={{ required: 'Model is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Model</label>
                            <InputText
                                id={field.name}
                                value={field.value}
                                className={classNames({
                                    'p-invalid': fieldState.error,
                                })}
                                onChange={(e) => field.onChange(e.target.value)}
                                placeholder="Model"
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
                {/*reg. number*/}
                <Controller
                    name="registrationNumber"
                    control={control}
                    rules={{ required: 'Reg. number is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Registration number</label>
                            <InputText
                                id={field.name}
                                value={field.value}
                                className={classNames({
                                    'p-invalid': fieldState.error,
                                })}
                                onChange={(e) => field.onChange(e.target.value)}
                                placeholder="e.g. EXMPL1234"
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
                {/* tech state*/}
                <Controller
                    name="techState"
                    control={control}
                    rules={{ required: 'Technical state is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Tech. state</label>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="name"
                                placeholder="Select technical state"
                                options={techStates}
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
                {/*tech review date*/}
                <Controller
                    name="techReviewDate"
                    control={control}
                    rules={{ required: mode === TruckModalMode.CREATE }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Next tech. review</label>
                            <Calendar
                                inputId={field.name}
                                value={field.value || new Date()}
                                onChange={field.onChange}
                                dateFormat="yy-mm-dd"
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
                {mode === TruckModalMode.CREATE ? (
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
                        <Button
                            type="button"
                            icon="pi pi-trash"
                            label="Delete"
                            severity="danger"
                            onClick={() => handleDeleteTruck(selectedTruck!.id)}
                        />
                        <Button type="submit" icon="pi pi-check" label="Update" />
                    </div>
                )}
            </form>
        </>
    );
};

export default TruckModalContent;
