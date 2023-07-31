const express = require('express');
const { Employee } = require('../models');

const router = express.Router();

router.get('/getAll', async (req, res) => {
    await res.send(Employee.findAll());
    // return await Employee.findAll();
});

router.post('/create', async (req, res) => {
    const newEmployee = Employee.build({
        firstName: 'Michal',
        lastName: 'Melka',
        truckId: 0,
        age: 22,
    });
    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (e) {
        console.log(e.massage);
    }
});

module.exports = router;
