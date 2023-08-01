import express, { Express, Request, Response } from 'express';
const cors = require('cors');
const database = require('./models');
const bodyParser = require('body-parser');

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(bodyParser())
const employeeRoute = require('./routes/Employee');
app.use('/employee', employeeRoute);

database.sequelize.sync().then((req: Request) => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})