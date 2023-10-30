const express = require('express');
const { Delivery } = require('../models');
const { sequelize } = require('../models/index');

const router = express.Router();

router.get('/getDeliveriesData', async (req, res) => {
    try {
        const data = await Delivery.findAll({
            raw: true,
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(401);
        console.log(e.message);
    }
});

module.exports = router;
