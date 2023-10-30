export enum Priority {
    MINOR = 'Minor',
    MEDIUM = 'Medium',
    HIGH = 'High',
    BLOCKER = 'Blocker',
}

export enum TruckModalMode {
    CREATE,
    EDIT,
}

export interface Checkpoint {
    step: DeliveryStep;
    date?: Date;
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

export enum DeliveryStep {
    STARTED = 'started',
    LOADED = 'loaded',
    IN_PROGRESS = 'in_progress',
    UNLOADED = 'unloaded',
    FINALIZED = 'finalized',
}
