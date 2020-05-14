const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(user === null) {
        return res.status(400).send('could not find user');
    }

    try {
        if(await bcrypt.compare(password, user.password)) {
            jwt.sign({user}, 'secretkey', (err, token) => {
                if(err) {
                    res.json({message: err});
                } else {
                    res.json({token, user});
                }
            })
        } else {
            res.status(400).send('Not Allowed');
        }
    } catch (err) {
        res.status(500).send({message: err})
    }
});

module.exports = router;