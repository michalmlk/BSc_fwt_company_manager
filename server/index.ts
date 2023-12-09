import { Express, Request } from 'express';
const express = require('express');

const cors = require('cors');
const database = require('./models');
const bodyParser = require('body-parser');

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(bodyParser());
app.use(express.json());

const employeeRoute = require('./routes/Employee');
app.use('/employee', employeeRoute);

const trucksRoute = require('./routes/Truck');
app.use('/truck', trucksRoute);

const deliveriesRoute = require('./routes/Delivery');
app.use('/delivery', deliveriesRoute);

database.sequelize.sync().then((req: Request) => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
