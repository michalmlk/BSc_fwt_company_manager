const express = require('express');
const { Delivery } = require('../models');
const { sequelize } = require('../models/index');

const router = express.Router();

router.get('/getDeliveries', async (req, res) => {
    try {
        const data = await Delivery.findAll({
            raw: true,
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(401);
        throw new Error({ message: 'Failed to fetch deliveries.' });
    }
});

router.post(`/updateStatus/:id`, async (req, res) => {
    const delivery = await Delivery.findOne({ where: { id: req.params.id } });

    try {
        await delivery.update({
            currentStep: req.body.index,
        });
        await delivery.save();
        res.status(201).json(delivery);
        return delivery;
    } catch (e) {
        throw new Error({ message: 'Failed to update status.' });
    }
});

router.post('/create', async (req, res) => {
    const newDelivery = await Delivery.build(req.body);
    try {
        await newDelivery.save();
        res.status(201).json(newDelivery);
        console.log('Delivery successfully created');
    } catch (e) {
        throw new Error({ message: 'Failed to create delivery' });
    }
});

router.post('/update/:id', async (req, res) => {
    const deliveryId = req.params.id;
    const delivery = await Delivery.findOne({
        where: {
            id: parseInt(deliveryId),
        },
    });
    try {
        await delivery.update({
            ...req.body,
        });
        await delivery.save();
        res.status(201).json(delivery);
        console.log('Delivery successfully created');
    } catch (e) {
        throw new Error({ message: 'Failed to update delivery' });
    }
});

module.exports = router;
