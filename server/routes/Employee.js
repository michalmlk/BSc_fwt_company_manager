const express = require('express');
const { Employee } = require('../models');

const router = express.Router();

router.get('/getAllEmployees', async (req, res) => {
    try {
        const data = await Employee.findAll({
            raw: true,
        });
        res.status(200).json(data);
        // return data;
    } catch (e) {
        res.status(401);
        console.log(e.massage);
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
    } catch (e) {
        console.log('Failed to update employee');
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
