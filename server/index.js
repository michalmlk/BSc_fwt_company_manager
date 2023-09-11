"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const database = require('./models');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const port = 3001;
app.use(cors());
app.use(bodyParser());
const employeeRoute = require('./routes/Employee');
app.use('/employee', employeeRoute);
const trucksRoute = require('./routes/Truck');
app.use('/truck', trucksRoute);
database.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
