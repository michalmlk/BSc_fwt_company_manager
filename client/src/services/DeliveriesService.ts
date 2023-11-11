import axios from 'axios';

export class DeliveryService {
    async getDeliveries() {
        try {
            const { data } = await axios.get('http://localhost:3001/delivery/getDeliveries');
            return data;
        } catch (e) {
            console.log(`Failed to fetch deliveries`);
            return [];
        }
    }
}
