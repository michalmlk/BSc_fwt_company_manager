import { TruckTechnicalState, Truck } from '../../../../Model';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { ModalFooter } from '../Modal/Modal';
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { truckSchema } from '../../../../common/model';

const AddTruckModalContent: ({
    selectedTruck,
    onClose,
}: {
    selectedTruck: Truck | undefined;
    onClose: () => void;
}) => void = ({ selectedTruck, onClose }) => {
    const defaultValues = {
        model: selectedTruck ? selectedTruck.model : '',
        registrationNumber: selectedTruck ? selectedTruck.registrationNumber : '',
        techState: selectedTruck ? selectedTruck.techState : '',
        techReviewDate: selectedTruck ? selectedTruck.techReviewDate : new Date(),
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm({ defaultValues, resolver: zodResolver(truckSchema), reValidateMode: 'onChange' });

    const getFormErrorMessage = (name) => {
        return errors[name] ? (
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    const onSubmit = (data) => {
        data.value && console.log(data);
    };

    const techStates = [
        { name: TruckTechnicalState.AVAILABLE, value: TruckTechnicalState.AVAILABLE },
        { name: TruckTechnicalState.SERVICE, value: TruckTechnicalState.SERVICE },
    ];

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
                                className={classNames({ 'p-invalid': fieldState.error })}
                                onChange={(e) => field.onChange(e.target.value)}
                                placeholder="Model"
                            />
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })} />
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
                                className={classNames({ 'p-invalid': fieldState.error })}
                                onChange={(e) => field.onChange(e.target.value)}
                                placeholder="e.g. EXMPL1234"
                            />
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })} />
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
                                className={classNames({ 'p-invalid': fieldState.error })}
                            />
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })} />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {/*tech review date*/}
                <Controller
                    name="techReviewDate"
                    control={control}
                    rules={{ required: 'Date is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>Next tech. review</label>
                            <Calendar
                                inputId={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                dateFormat="yy-mm-dd"
                                className={classNames({ 'p-invalid': fieldState.error })}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <ModalFooter
                    onClose={onClose}
                    onConfirm={() => console.log('abc')}
                    icon="pi pi-plus"
                    label="Add"
                    disabled={false}
                    type="submit"
                />
            </form>
        </>
    );
};

export default AddTruckModalContent;