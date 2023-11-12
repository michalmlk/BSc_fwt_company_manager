export enum ModalMode {
    CREATE,
    EDIT,
}

export interface Truck {
    id: number;
    model: string;
    registrationNumber: string;
    EmployeeId: number | null;
    techState: TruckTechnicalState;
    techReviewDate: Date | null;
}

export enum TruckTechnicalState {
    AVAILABLE = 'available',
    SERVICE = 'serviced',
    DELIVERY = 'delivery',
}
