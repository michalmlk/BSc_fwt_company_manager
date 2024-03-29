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

router.get('/get/:id', async (req, res) => {
    try {
        const truck = await Truck.findOne({
            where: {
                id: parseInt(req.params.id),
            },
        });
        return res.status(200).json(truck);
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

router.post(`/update/:id`, async (req, res) => {
    const currentTruck = await Truck.findOne({ where: { id: parseInt(req.params.id) } });
    try {
        await currentTruck.update({
            ...req.body,
        });
        await currentTruck.save();
        res.status(201).json(currentTruck);
        return currentTruck;
    } catch (e) {
        console.log('Error when truck update: ', e.message);
    }
});

router.post('/delete/:id', async (req, res, ctx) => {
    try {
        await Truck.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send('Truck successfully deleted');
    } catch (e) {
        res.status(500);
        console.log(`Error: ${e.message}`);
    }
});

module.exports = router;
