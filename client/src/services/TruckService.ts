import axios from 'axios';
import { TruckSchema } from '../common/model';
import format from 'date-fns/format';
import { Truck } from '../Model';

export class TruckService {
    async addTruck(truckData: TruckSchema): Promise<void> {
        try {
            await axios.post('http://localhost:3001/truck/addTruck', {
                id: Math.random() * 1000,
                ...truckData,
                techReviewDate: truckData.techReviewDate
                    ? format(new Date(truckData.techReviewDate), 'yyyy-MM-dd')
                    : format(new Date(), 'yyyy-MM-dd'),
            });
        } catch (e: any) {
            console.log(`Adding truck failed: ${e.message}.`);
        }
    }

    async getTruck(id: number): Promise<Truck | undefined> {
        try {
            const { data } = await axios.get(`http://localhost:3001/truck/get/${id}`);
            return data;
        } catch (e: any) {
            console.log('Failed to get truck.');
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

    async deleteTruck(id: number): Promise<void> {
        try {
            await axios.post(`http://localhost:3001/truck/delete/${id}`);
        } catch (e: any) {
            throw e.message;
        }
    }
}
