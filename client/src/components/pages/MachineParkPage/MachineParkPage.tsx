import React, { useEffect, useState } from 'react';
import { Truck } from '../../../Model';
import { ManagerService } from '../../../services/ManagerService';
import { useQuery } from '@tanstack/react-query';
import { ActionBar } from '../../atoms/ActionBar';
import MachineCard from '../../organisms/MachineCard/MachineCard';

const MachineParkPage: React.FC = () => {
    const service = new ManagerService();
    const [machines, setMachines] = useState<Truck[]>([]);

    const { data } = useQuery({
        queryKey: ['trucks'],
        queryFn: async (): Promise<Truck[] | undefined> => {
            return await service.getAllTrucks();
        },
    });

    useEffect(() => {
        if (data) {
            setMachines(data);
        }
    }, [data]);

    return (
        <div className="flex flex-column w-12 relative">
            <ActionBar onAdd={() => console.log('ok')} label="Add truck" icon="pi pi-plus" />
            <div className="flex gap-4 p-6">{data && machines.map((d) => <MachineCard machine={d} key={d.id} />)}</div>
        </div>
    );
};

export default MachineParkPage;
