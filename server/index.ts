import express, { Express, Request, Response } from 'express';

const app: Express = express();
const database = require('./models');
const port = 3001;

const employeeRoute = require('./routes/Employee');
app.use('/employee', employeeRoute);

database.sequelize.sync().then((req: Request) => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})