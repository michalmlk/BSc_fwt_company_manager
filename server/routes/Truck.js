const express = require('express');
const {Truck, Employee} = require('../models');

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

module.exports = router;
