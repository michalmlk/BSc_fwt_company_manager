import React, { useMemo, useState } from 'react';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal/Modal';
import { ActionBar } from '../../atoms/ActionBar';
import EmployeeGrid from '../../organisms/EmployeeGrid/EmployeeGrid';
import { Employee } from '../../../common/model';
import { ModalMode } from '../../../Model';
import EmployeeModalContent from '../../organisms/Modal/EmployeeModal/EmployeeModalContent';

const EmployeePage: React.FC = () => {
    const {
        isModalOpen: isEmployeeModalOpen,
        handleModalOpen: handleEmployeeModalOpen,
        handleModalClose: handleEmployeeModalClose,
    } = useModal();

    const [currentEmployee, setCurrentEmployee] = useState<Employee>();

    const EmployeeModal = useMemo(() => {
        return (
            <Modal
                title={currentEmployee ? 'Update Employee ' : 'Add employee'}
                onClose={handleEmployeeModalClose}
                renderFooter={false}
                classNames="w-3"
            >
                <EmployeeModalContent
                    currentEmployee={currentEmployee || undefined}
                    onClose={() => {
                        handleEmployeeModalClose();
                        setCurrentEmployee(undefined);
                    }}
                    mode={currentEmployee ? ModalMode.EDIT : ModalMode.CREATE}
                />
            </Modal>
        );
    }, [handleEmployeeModalClose, currentEmployee]);
    //     () => (
    //         <Modal
    //             title={`${currentEmployee ? 'Edit' : 'Add'} Employee`}
    //             onClose={() => {
    //                 handleAddEmployeeModalClose();
    //                 setCurrentEmployee(undefined);
    //                 reset();
    //             }}
    //             onConfirm={handleSubmit((data) => data && onSubmit(data, !!currentEmployee))}
    //             type="submit"
    //             label={currentEmployee ? 'Save' : 'Add'}
    //             icon={currentEmployee ? 'pi pi-check' : 'pi pi-save'}
    //             renderFooter
    //             classNames="w-4"
    //         >
    //             <form onSubmit={handleSubmit((data) => data && onSubmit(data, mode))}>
    //                 <div className="flex flex-column gap-1">
    //                     <Controller
    //                         name="firstName"
    //                         control={control}
    //                         render={({ field, fieldState }) => (
    //                             <>
    //                                 <label htmlFor={field.name}>First name</label>
    //                                 <InputText
    //                                     name={field.name}
    //                                     value={field.value}
    //                                     onChange={field.onChange}
    //                                     className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
    //                                     placeholder="First name"
    //                                 />
    //                                 {getFormErrorMessage(field.name)}
    //                             </>
    //                         )}
    //                     />
    //                     <Controller
    //                         name="lastName"
    //                         control={control}
    //                         render={({ field, fieldState }) => (
    //                             <>
    //                                 <label htmlFor={field.name}>Last name</label>
    //                                 <InputText
    //                                     name={field.name}
    //                                     value={field.value}
    //                                     onChange={field.onChange}
    //                                     className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
    //                                     placeholder="Last name"
    //                                 />
    //                                 {getFormErrorMessage(field.name)}
    //                             </>
    //                         )}
    //                     />
    //                     {!currentEmployee && (
    //                         <Controller
    //                             name="age"
    //                             control={control}
    //                             render={({ field, fieldState }) => (
    //                                 <>
    //                                     <label htmlFor="age">Age</label>
    //                                     <InputNumber
    //                                         id={field.name}
    //                                         inputRef={field.ref}
    //                                         value={field.value}
    //                                         onBlur={field.onBlur}
    //                                         onValueChange={(e) => field.onChange(e)}
    //                                         useGrouping={false}
    //                                         placeholder="Age"
    //                                         inputClassName={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
    //                                     />
    //                                     {getFormErrorMessage(field.name)}
    //                                 </>
    //                             )}
    //                         />
    //                     )}
    //                     <Controller
    //                         name="phoneNumber"
    //                         control={control}
    //                         render={({ field, fieldState }) => (
    //                             <>
    //                                 <label htmlFor={field.name}>Phone number</label>
    //                                 <InputText
    //                                     name={field.name}
    //                                     value={field.value}
    //                                     onChange={field.onChange}
    //                                     className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
    //                                     placeholder="Phone number"
    //                                 />
    //                                 {getFormErrorMessage(field.name)}
    //                             </>
    //                         )}
    //                     />
    //                     <Controller
    //                         name="email"
    //                         control={control}
    //                         render={({ field, fieldState }) => (
    //                             <>
    //                                 <label htmlFor={field.name}>Email</label>
    //                                 <InputText
    //                                     name={field.name}
    //                                     value={field.value}
    //                                     onChange={field.onChange}
    //                                     className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
    //                                     placeholder="Email"
    //                                 />
    //                                 {getFormErrorMessage(field.name)}
    //                             </>
    //                         )}
    //                     />
    //                 </div>
    //             </form>
    //         </Modal>
    //     ),
    //     [handleAddEmployeeModalClose, reset, onSubmit, currentEmployee, defaultValues]
    // );

    return (
        <div className="flex flex-column w-12 relative">
            {isEmployeeModalOpen && EmployeeModal}
            <ActionBar onAdd={handleEmployeeModalOpen} icon="pi pi-plus" label="Add employee" />
            <EmployeeGrid onEditEmployee={handleEmployeeModalOpen} onDataSet={setCurrentEmployee} />
        </div>
    );
};

export default EmployeePage;
