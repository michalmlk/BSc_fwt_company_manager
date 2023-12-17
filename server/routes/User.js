const express = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const router = express.Router();

const encryptWithAES = (text, passphrase) => {
    return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext, passphrase) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

router.post('/create', async (req, res) => {
    const login = req.body.userName;
    console.log(login);
    const newUser = await User.build({
        ...req.body,
        password: encryptWithAES(req.body.password, req.body.userName),
    });

    try {
        await newUser.save();
        res.status(200).send('User successfully created');
    } catch (e) {
        res.status(401).send(e.message);
        console.log(e.message);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            userName: req.body.userName,
        },
    });
    if (user && decryptWithAES(user.password, user.userName) === req.body.password) {
        jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.log(err);
            }
            res.status(200).send(token);
        });
    } else {
        res.status(401).send('Could not authorize');
    }
});

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
};

router.get('/userdata', checkToken, (req, res) => {
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if (err) {
            console.log('Error');
            res.status(403).send('Could not authorise');
        } else {
            res.status(200).json({
                message: 'Successfully logged in.',
                userData: {
                    id: authorizedData.user.id,
                    userName: authorizedData.user.login,
                    firstName: authorizedData.user.firstName,
                    lastName: authorizedData.user.lastName,
                },
            });
        }
    });
});

module.exports = router;
