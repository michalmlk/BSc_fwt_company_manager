"use strict";
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var database = require('./models');
var bodyParser = require('body-parser');
var app = express();
var port = 3001;
app.use(cors());
app.use(bodyParser());
app.use(express.json());
var employeeRoute = require('./routes/Employee');
app.use('/employee', employeeRoute);
var trucksRoute = require('./routes/Truck');
app.use('/truck', trucksRoute);
var deliveriesRoute = require('./routes/Delivery');
app.use('/delivery', deliveriesRoute);
database.sequelize.sync().then(function (req) {
    app.listen(port, function () {
        console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
    });
});
