import axios from 'axios';
import { EmployeeSchema } from '../common/model';
import { Employee } from '../common/model';

export class ManagerService {

    async getEmployee(id: number): Promise<EmployeeSchema | undefined> {
        try {
            const { data } = await axios.get(`http://localhost:3001/employee/getEmployee/${id}`);
            return data;
        } catch (e: any) {
            console.log(`Failed get employee with id: ${id}`)
        }
    }

    async deleteEmployee(id: number): Promise<void> {
        try {
            console.log('Deleting user...')
            await axios.delete(`http://localhost:3001/employee/deleteEmployee/${id}`);
        } catch (e: any) {
            console.log(`Failed to delete employee with id: ${id}`)
        }
    }

    async getAllEmployees(): Promise<Employee[] | undefined> {
        try {
            console.log('Fetching employees...')
            const { data } = await axios.get(`http://localhost:3001/employee/getAllEmployees`);
            return data;
        } catch (e: any) {
            console.log(`Failed to fetching employees: ${e.message}`)
        }
    }

    async updateEmployee(id: number, updateData: any): Promise<void> {
        try {
            await axios.put(`http://localhost:3001/employee/updateEmployee/${id}`, updateData);
            console.log(`Update successfull`);
        } catch (e: any) {
            console.log('Error during update.')
        }
    }

    async createEmployee({ firstName, lastName, age, phoneNumber, email, currentDeliveryId, truckId }: EmployeeSchema): Promise<void> {
        await axios.post('http://localhost:3001/employee/createEmployee', {
            firstName,
            lastName,
            age,
            phoneNumber: parseInt(phoneNumber),
            email,
            currentDeliveryId: currentDeliveryId || undefined,
            truckId: truckId || undefined
        });
    }
}