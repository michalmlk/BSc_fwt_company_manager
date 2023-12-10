import axios from 'axios';

export class LoginService {
    async getData(): Promise<any> {
        try {
            const data = await axios.get('http://localhost:3001/user/userdata');
            return data;
        } catch (e) {
            console.log('Failed to get data');
        }
    }
}
