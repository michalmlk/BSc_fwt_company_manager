export interface Report {
    date: Date;
    comment: string;
    priority: Priority;
    driver: Driver;
}

export enum Priority {
    MINOR = 'Minor',
    MEDIUM = 'Medium',
    HIGH = 'High',
    BLOCKER = 'Blocker',
}

export interface Checkpoint {
    status: DeliveryStatus;
    date?: Date;
}

export interface Delivery {
    id: number;
    product: string;
    destination: string;
    deadline: Date;
    status: DeliveryStatus;
    driver: Driver;
    reports: Array<Report>;
    history: Array<Checkpoint>;
}

export interface Truck {
    id: number;
    model: string;
    registrationNumber: string;
    driverId?: number | undefined;
    techState: TruckTechnicalState;
}

export interface Driver {
    id: number;
    firstName: string;
    lastName: string;
    truck: Truck;
    isBusy: boolean;
}

export enum DeliveryStatus {
    STARTED = 'Started',
    LOADED = 'Loaded',
    IN_PROGRESS = 'In progress',
    UNLOADED = 'Unloaded',
    FINALIZED = 'Finalized',
}

export enum TruckTechnicalState {
    AVAILABLE = 'available',
    SERVICE = 'service',
}