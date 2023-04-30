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
    BLOCKER = 'Blocker'
}

export interface Delivery {
    id: number;
    product: string;
    destination: string;
    deadline: Date;
    status: DeliveryStatus;
    driver: Driver;
    reports: Array<Report>
}

export interface Truck {
    id: number;
    model: string;
    licencePlateNumber: string;
    dateOfInsurance: Date;
    dateOfTechReview: Date;
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
    IN_PROGRESS = 'In progress',
    FINALIZED = 'Finalized',
}