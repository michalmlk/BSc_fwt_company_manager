import axios from 'axios';

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
}
