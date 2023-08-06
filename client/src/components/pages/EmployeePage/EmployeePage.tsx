import React from 'react';
import { Button } from 'primereact/button';
import useModal from '../../../hooks/useModal';
import Modal from '../../organisms/Modal/Modal';

interface ActionBarProps {
    onAdd: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onAdd }) => {
    return (
        <div className="flex justify-content-end p-4">
            <Button icon="pi pi-plus" label="Add employee" rounded onClick={onAdd} />
        </div>
    );
};

const EmployeePage = () => {
    const {
        isModalOpen: isAddEmployeeModalOpen,
        handleModalOpen: handleAddEmployeeModalOpen,
        handleModalClose: handleAddEmployeeModalClose,
    } = useModal();

    const AddEmployeeModal = React.useMemo(
        () => <Modal title="Add Employee" onClose={handleAddEmployeeModalClose} />,
        [handleAddEmployeeModalClose]
    );

    return (
        <>
            {isAddEmployeeModalOpen && AddEmployeeModal}
            <ActionBar onAdd={handleAddEmployeeModalOpen} />
        </>
    );
};

export default EmployeePage;
