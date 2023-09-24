import { Button } from 'primereact/button';

interface ActionBarProps {
    onAdd: () => void;
    label: string;
    icon: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onAdd, label, icon }) => {
    return (
        <div className="flex justify-content-end p-4">
            <Button icon={icon} label={label} onClick={onAdd} />
        </div>
    );
};
