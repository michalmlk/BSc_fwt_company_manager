const express = require('express');
const { Truck } = require('../models');

const router = express.Router();

router.get('/getAllTrucks', async (req, res) => {
    try {
        const data = await Truck.findAll({
            raw: true,
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(401);
        console.log(e.message);
    }
});

router.post('/addTruck', async (req, res) => {
    const newTruck = await Truck.build(req.body);

    try {
        await newTruck.save();
        res.status(201).json(newTruck);
        console.log('Truck successfully added');
    } catch (e) {
        console.log('Error from Truck route: ', e.message);
    }
});

module.exports = router;
