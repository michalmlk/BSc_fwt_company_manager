import * as z from 'zod';
import validator from 'validator';
import { TruckTechnicalState } from '../Model';

export const employeeSchema = z.object({
    firstName: z.string().min(1, { message: 'Firstname is required' }),
    lastName: z.string().min(1, { message: 'Lastname is required' }),
    age: z.number().min(18, { message: 'Employee must be at least in age 18' }),
    phoneNumber: z.string().refine(validator.isMobilePhone).nullish(),
    email: z.string().min(1, { message: 'Email is required' }).email({
        message: 'Must be a valid email',
    }),
    currentDeliveryId: z.number().nullish(),
    truckId: z.number().nullish(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;

export interface Employee extends EmployeeSchema {
    id: number;
}

export const truckSchema = z.object({
    model: z.string().min(1, { message: 'Model is required' }),
    registrationNumber: z.string().regex(new RegExp(/[A-Z]{4}[0-9]{4}/), { message: 'Registration number is invalid' }),
    techState: z.nativeEnum(TruckTechnicalState),
    techReviewDate: z.date(),
});

export type TruckSchema = z.infer<typeof truckSchema>;

export interface Truck extends TruckSchema {
    id: number;
}
