import { Delivery, DeliveryStatus, Driver, Priority, Report, Truck } from './Model';

export const trucks: Array<Truck> = [
    {
        id: 1,
        model: 'Scania',
        licencePlateNumber: 'EXMPL01',
        dateOfInsurance: new Date(),
        dateOfTechReview: new Date(),
    },
    {
        id: 2,
        model: 'DAF',
        licencePlateNumber: 'EXMPL02',
        dateOfInsurance: new Date(),
        dateOfTechReview: new Date(),
    },
    {
        id: 3,
        model: 'Mercedes',
        licencePlateNumber: 'EXMPL03',
        dateOfInsurance: new Date(),
        dateOfTechReview: new Date(),
    },
];

export const drivers: Array<Driver> = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        truck: trucks[0],
        isBusy: false
    },
    {
        id: 2,
        firstName: 'Adam',
        lastName: 'Jose',
        truck: trucks[1],
        isBusy: false
    },
    {
        id: 3,
        firstName: 'Kyle',
        lastName: 'Nowack',
        truck: trucks[2],
        isBusy: false
    }
];

export const reports: Array<Report> = [
    {
        date: new Date(),
        comment: 'My engine is broken',
        priority: Priority.BLOCKER,
        driver: drivers[0]
    },
    {
        date: new Date(),
        comment: 'Somebody stole my CB-RADIO',
        priority: Priority.MEDIUM,
        driver: drivers[1]
    },
    {
        date: new Date(),
        comment: 'My usb charger is broken',
        priority: Priority.MINOR,
        driver: drivers[2]
    },

]

export const deliveries: Array<Delivery> = [
    {
        id: 1,
        product: 'Toilet paper',
        destination: 'Bratislava',
        deadline: new Date(),
        status: DeliveryStatus.STARTED,
        driver: drivers[0],
        reports: []
    },
    {
        id: 2,
        product: 'Bottles of water',
        destination: 'Warsaw',
        deadline: new Date(),
        status: DeliveryStatus.IN_PROGRESS,
        driver: drivers[1],
        reports: []
    },
    {
        id: 3,
        product: 'Toilet paper',
        destination: 'Cracow',
        deadline: new Date(),
        status: DeliveryStatus.FINALIZED,
        driver: drivers[0],
        reports: []
    }
]