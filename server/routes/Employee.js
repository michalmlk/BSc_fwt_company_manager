const express = require('express');
const { Employee } = require('../models');

const router = express.Router();

router.get('/getAll', async (req, res) => {
    await res.send(Employee.findAll());
    return await Employee.findAll();
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
