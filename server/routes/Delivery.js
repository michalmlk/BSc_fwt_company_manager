const express = require('express');
const { Delivery, Employee } = require('../models');
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
    try {
        await sequelize.transaction(async function (transaction) {
            const newDelivery = await Delivery.build(req.body);
            await newDelivery.save();
            const user = await Employee.findOne({ where: { id: req.body.employeeId } });
            if (user) {
                await user.update({ currentDeliveryId: req.body.id }, { transaction });
                await user.save();
                console.log('Delivery successfully created');
            }
            res.status(201).json(newDelivery);
        });
    } catch (e) {
        res.status(500).send('Bad request');
        console.log(e.message);
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
        console.log('Delivery successfully updated');
    } catch (e) {
        throw new Error({ message: 'Failed to update delivery' });
    }
});

router.post('/delete/:id', async (req, res) => {
    const delivery = await Delivery.findOne({ where: { id: parseInt(req.params.id) } });
    try {
        await sequelize.transaction(async function (trx) {
            if (delivery.employeeId) {
                const user = await Employee.findOne({ where: { id: delivery.employeeId } });
                await user.update({ currentDeliveryId: null }, { trx });
                await user.save();
            }
            await Delivery.destroy(
                {
                    where: {
                        id: parseInt(req.params.id),
                    },
                },
                { trx }
            );
        });
        res.status(200).send(`Delivery successfully deleted`);
    } catch (e) {
        res.status(500).send(`Failed to remove delivery ${e.message}`);
    }
});

module.exports = router;
