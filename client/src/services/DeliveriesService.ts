import axios from 'axios';
import { DeliverySchema } from '../common/model';

export class DeliveryService {
    async getDeliveries() {
        try {
            const { data } = await axios.get('http://localhost:3001/delivery/getDeliveries');
            return data;
        } catch (e: any) {
            console.log(e.message);
            return [];
        }
    }

    async commitStatusChange(deliveryId: number, index: number) {
        try {
            await axios.post(`http://localhost:3001/delivery/updateStatus/${deliveryId}`, {
                index,
            });
        } catch (e: any) {
            console.log(e.message);
        }
    }

    async createDelivery(data: DeliverySchema) {
        await axios.post('http://localhost:3001/delivery/create', {
            ...data,
            id: Math.random() * 1000,
        });
    }

    async removeDelivery(id: number) {
        await axios.post(`http://localhost:3001/delivery/delete/${id}`);
    }

    async updateDelivery(data: DeliverySchema, deliveryId: number) {
        await axios.post(`http://localhost:3001/delivery/update/${deliveryId}`, {
            ...data,
        });
    }
}
