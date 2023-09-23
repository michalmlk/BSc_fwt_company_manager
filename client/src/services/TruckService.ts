import { Truck } from '../Model';
import axios from 'axios';
import { TruckSchema } from '../common/model';
import format from 'date-fns/format';

export class TruckService {
    async getAllTrucks(): Promise<Truck[] | undefined> {
        try {
            console.log('Fetching trucks...');
            const { data } = await axios.get('http://localhost:3001/truck/getAllTrucks');
            return data;
        } catch (e: any) {
            console.log(`Failed to fetching trucks: ${e.message}`);
        }
    }

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
}
