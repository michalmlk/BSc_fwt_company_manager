import React from 'react';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal';
import { ActionBar } from '../../atoms/ActionBar';
import EmployeeGrid from './components/EmployeeGrid';
import { useForm, Resolver, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { ManagerService } from '../../../services/ManagerService';
import { toast } from 'react-toastify';

export interface EmployeeData {
    firstName: string;
    lastName: string;
    age: number;
    truckId?: number;
}

const EmployeePage: React.FC<{}> = () => {
    const {
        isModalOpen: isAddEmployeeModalOpen,
        handleModalOpen: handleAddEmployeeModalOpen,
        handleModalClose: handleAddEmployeeModalClose,
        RenderModal: renderAddEmployeeModal,
    } = useModal();

    const managerService = new ManagerService();

    const resolver: Resolver<EmployeeData> = async (values) => {
        return {
            values: values.firstName ? values : {},
            errors:
                !values.firstName || !values.lastName || !values.age
                    ? {
                          firstName: {
                              type: 'required',
                              message: 'Name is required',
                          },
                          lastName: {
                              type: 'required',
                              message: 'Last name is required',
                          },
                          age: {
                              type: 'required',
                              message: 'Age is required',
                          },
                      }
                    : {},
        };
    };

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid, isDirty, isSubmitting },
    } = useForm<EmployeeData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            age: 18,
        },
        // reValidateMode: 'onBlur',
        resolver,
    });

    const onSubmit = async (data: EmployeeData): Promise<void> => {
        const toastId = toast.loading('Creating employee...');
        try {
            await managerService.createEmployee(data);
            await toast.success('Employee successfully created.');
        } catch (e) {
            toast.error('Error at creating employee.');
        }
        handleAddEmployeeModalClose();
        reset();
        toast.dismiss(toastId);
    };

    const AddEmployeeForm = React.useMemo(() => {
        return (
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="flex flex-column gap-3 align-items-start">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <InputText
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="First name"
                            />
                        )}
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <InputText
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Last name"
                            />
                        )}
                    />
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <InputText
                                name={field.name}
                                value={field.value.toString()}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Age"
                            />
                        )}
                    />
                    {errors.age && <p>{errors.age.message}</p>}
                </div>
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
