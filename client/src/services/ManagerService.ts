import axios from 'axios'

interface Employee {
    firstName: string,
    lastName: string,
    age: number,
    truckId?: number
}

export class ManagerService {

    async getEmployee(id: number): Promise<Employee> {
        return await axios.get(`http://localhost:3001/employee/getEmployee/${id}`)
    }

    async getAllEmployees(): Promise<any[]> {
        return await axios.get(`http://localhost:3001/employee/getAllEmployees`)
    }

    async updateEmployee(id: number, updateData: any): Promise<void> {
        await axios.put(`http://localhost:3001/employee/updateEmployee/${id}`, updateData)
    }

    async createEmployee({ firstName, lastName, age, truckId }: Employee): Promise<void> {
        await axios.post('http://localhost:3001/employee/createEmployee', {
            firstName,
            lastName,
            age,
            truckId: truckId || undefined
        });
    }
}