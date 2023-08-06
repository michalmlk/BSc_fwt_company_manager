import React, { ReactNode } from 'react';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal';
import { ActionBar } from './components/ActionBar';
import EmployeeGrid from './components/EmployeeGrid';

const EmployeePage: React.FC<{}> = () => {
    const {
        isModalOpen: isAddEmployeeModalOpen,
        handleModalOpen: handleAddEmployeeModalOpen,
        handleModalClose: handleAddEmployeeModalClose,
        RenderModal: renderAddEmployeeModal,
    } = useModal();

    const AddEmployeeModal = React.useMemo(
        () =>
            renderAddEmployeeModal(
                <Modal
                    title="Add Employee"
                    onClose={handleAddEmployeeModalClose}
                    onConfirm={() => console.log('ok')}
                ></Modal>
            ),
        [handleAddEmployeeModalClose]
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
