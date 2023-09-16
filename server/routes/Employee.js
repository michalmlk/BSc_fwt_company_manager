const express = require('express');
const { Employee, Truck } = require('../models');

const router = express.Router();

router.get('/getAllEmployees', async (req, res) => {
    try {
        const data = await Employee.findAll({
            raw: true,
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(401);
        console.log(e.message);
    }
});

router.delete('/deleteEmployee/:id', async (req, res) => {
    try {
        await Employee.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send('Successfully deleted employee.');
    } catch (e) {
        res.status(500);
        console.log(`Error: ${e.message}`);
    }
});

router.post('/createEmployee', async (req, res) => {
    const newEmployee = Employee.build(req.body);
    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
        console.log('Employee successfully created');
    } catch (e) {
        console.log(e.massage);
    }
});

router.put('/updateEmployee/:id', async (req, res) => {
    try {
        const user = await Employee.findOne({ where: { id: parseInt(req.params.id) } });
        await user.update({ ...req.body });
        await user.save();
        res.status(201).json(user);
    } catch (e) {
        console.log('Failed to update employee');
    }
});

router.post('/updateEmployee/:id/truck', async (req, res) => {
    try {
        const user = await Employee.findOne({ where: { id: parseInt(req.params.id) } });
        //TODO little hacky solution - fix
        await user.update({ truckId: Object.keys(req.body) });
        const truck = await Truck.findOne({ where: { id: Object.keys(req.body) } });
        await truck.update({ EmployeeId: parseInt(req.params.id) });
        await user.save();
        await truck.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400);
        console.log('Failed to update truck assignment.');
    }
});

router.get('/getEmployee/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: parseInt(req.params.id),
            },
        });
        return employee;
    } catch (e) {
        console.log(`Cannot find employee with id: ${req.params.id}`);
    }
});

module.exports = router;
