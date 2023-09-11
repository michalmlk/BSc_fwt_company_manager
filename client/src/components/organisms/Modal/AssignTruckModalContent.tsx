import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ManagerService } from '../../../services/ManagerService';
import { Truck } from '../../../Model';

import { Dropdown } from 'primereact/dropdown';

const AssignTruckModalContent: React.FC = (id: number | undefined) => {
    const service = new ManagerService();

    const { data } = useQuery({
        queryKey: ['trucks'],
        queryFn: async (): Promise<Truck[] | undefined> => {
            return await service.getAllTrucks();
        },
    });

    console.log(data);

    const [trucks, setTrucks] = useState<Truck[]>([]);

    useEffect(() => {
        if (data) {
            setTrucks(data);
        }
    }, [data]);

    return (
        <Dropdown
            value={trucks[0]}
            onChange={(e) => console.log(e)}
            options={trucks}
            optionLabel="model"
            placeholder="Select Truck"
            className="w-12 mb-4"
        />
    );
};

export default AssignTruckModalContent;
