import * as z from 'zod';
import validator from 'validator';

export const employeeSchema = z.object({
    firstName: z.string().min(1, { message: 'Firstname is required' }),
    lastName: z.string().min(1, { message: 'Lastname is required' }),
    age: z.number().min(18, { message: 'Employee must be at least in age 18' }),
    phoneNumber: z.string().refine(validator.isMobilePhone),
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    currentDeliveryId: z.number().nullish(),
    truckId: z.number().nullish(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;

export interface Employee extends EmployeeSchema {
    id: number
}