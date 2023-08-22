import React from 'react';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal';
import { ActionBar } from '../../atoms/ActionBar';
import EmployeeGrid from './components/EmployeeGrid';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ManagerService } from '../../../services/ManagerService';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { classNames } from 'primereact/utils';
import { EmployeeSchema, employeeSchema } from '../../../common/model';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultEmployeeFormValues = {
    firstName: '',
    lastName: '',
    age: 18,
    phoneNumber: undefined,
    email: '',
};

const EmployeePage: React.FC<{}> = () => {
    const queryClient = useQueryClient();
    const managerService = new ManagerService();

    const getFormErrorMessage = (name: string) => {
        //@ts-ignore
        return errors[name] ? (
            //@ts-ignore
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    const {
        isModalOpen: isAddEmployeeModalOpen,
        handleModalOpen: handleAddEmployeeModalOpen,
        handleModalClose: handleAddEmployeeModalClose,
        RenderModal: renderAddEmployeeModal,
    } = useModal();

    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors, isValid, isDirty, isSubmitting },
    } = useForm<EmployeeSchema>({
        defaultValues: defaultEmployeeFormValues,
        resolver: zodResolver(employeeSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: EmployeeSchema): Promise<void> => {
        const toastId = toast.loading('Creating employee...');
        try {
            await managerService.createEmployee(data);
            toast.success('Employee successfully created.');
            await queryClient.invalidateQueries(['employees']);
        } catch (e) {
            toast.error('Error at creating employee.');
        }
        handleAddEmployeeModalClose();
        reset();
        toast.dismiss(toastId);
    };

    const AddEmployeeForm = React.useMemo(() => {
        const w = watch();
        return (
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="flex flex-column gap-3 align-items-start">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <>
                                <InputText
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    placeholder="First name"
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: 'Last name is required' }}
                        render={({ field }) => (
                            <>
                                <InputText
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
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
                                <InputNumber
                                    id={field.name}
                                    inputRef={field.ref}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onValueChange={(e) => field.onChange(e)}
                                    useGrouping={false}
                                    placeholder="Age"
                                    inputClassName={classNames({ 'p-invalid': fieldState.error })}
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
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onChange={(e) => field.onChange(e)}
                                    className={classNames({ 'p-invalid': fieldState.error })}
                                    placeholder="Phone number"
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <>
                                <InputText
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    placeholder="Email"
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </div>
                <pre>{JSON.stringify(w, null, 2)}</pre>
            </form>
        );
    }, []);

    const AddEmployeeModal = React.useMemo(
        () =>
            renderAddEmployeeModal(
                <Modal
                    title="Add Employee"
                    onClose={() => {
                        handleAddEmployeeModalClose();
                        reset();
                    }}
                    onConfirm={handleSubmit(onSubmit)}
                    type="submit"
                    label="Add"
                    disabled={!isValid}
                    icon="pi pi-plus"
                >
                    {AddEmployeeForm}
                </Modal>
            ),
        [handleAddEmployeeModalClose, isSubmitting, isDirty, isValid]
    );

    return (
        <div className="flex flex-column w-12 relative">
            {isAddEmployeeModalOpen && AddEmployeeModal}
            <ActionBar onAdd={handleAddEmployeeModalOpen} />
            <EmployeeGrid />
        </div>
    );
};

export default EmployeePage;
