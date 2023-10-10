import axios from 'axios';
import { TruckSchema } from '../common/model';
import format from 'date-fns/format';

export class TruckService {
    async addTruck(truckData: TruckSchema): Promise<void> {
        try {
            await axios.post('http://localhost:3001/truck/addTruck', {
                ...truckData,
                techReviewDate: format(new Date(truckData.techReviewDate), 'yyyy-MM-dd'),
            });
        } catch (e: any) {
            console.log(`Adding truck failed: ${e.message}.`);
        }
    }

    async updateTruck(truckData: TruckSchema, id: number): Promise<void> {
        try {
            await axios.post(`http://localhost:3001/truck/update/${id}`, {
                ...truckData,
            });
        } catch (e: any) {
            console.log(`Failed to update truck: ${e.message}`);
        }
    }
}
