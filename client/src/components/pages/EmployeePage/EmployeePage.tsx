import React from 'react';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal/Modal';
import { ActionBar } from '../../atoms/ActionBar';
import EmployeeGrid from '../../organisms/EmployeeGrid/EmployeeGrid';
import { Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import useEmployeeForm from '../../../hooks/useEmployeeForm';

const EmployeePage: React.FC = () => {
    const {
        isModalOpen: isAddEmployeeModalOpen,
        handleModalOpen: handleAddEmployeeModalOpen,
        handleModalClose: handleAddEmployeeModalClose,
        RenderModal: renderAddEmployeeModal,
    } = useModal();

    const { onSubmit, errors, reset, handleSubmit, control } = useEmployeeForm({
        onClose: handleAddEmployeeModalClose,
    });

    const getFormErrorMessage = (name: string) => {
        return errors[name] ? (
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    const EmployeeFormModal = React.useMemo(
        () =>
            renderAddEmployeeModal(
                <Modal
                    title="Add Employee"
                    onClose={() => {
                        handleAddEmployeeModalClose();
                        reset();
                    }}
                    onConfirm={handleSubmit((data) => data && onSubmit(data))}
                    type="submit"
                    label="Add"
                    icon="pi pi-plus"
                    renderFooter
                    classNames="w-4"
                >
                    <form onSubmit={handleSubmit((data) => data && onSubmit(data))}>
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
                    </form>
                </Modal>
            ),
        [handleAddEmployeeModalClose, reset, onSubmit]
    );

    return (
        <div className="flex flex-column w-12 relative">
            {isAddEmployeeModalOpen && EmployeeFormModal}
            <ActionBar onAdd={handleAddEmployeeModalOpen} icon="pi pi-plus" label="Add employee" />
            <EmployeeGrid />
        </div>
    );
};

export default EmployeePage;
