import { Button } from 'primereact/button';

interface ActionBarProps {
    onAdd: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onAdd }) => {
    return (
        <div className="flex justify-content-end p-4">
            <Button icon="pi pi-plus" label="Add employee" rounded onClick={onAdd} />
        </div>
    );
};
