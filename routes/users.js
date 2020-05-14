const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const verifyToken = require('../helpers');
const bcrypt = require('bcrypt');
require('dotenv/config');

router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/add', async (req, res) => {
    const { email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User({
            email,
            password: hashedPassword
        });
        const savedUser = await user.save();
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:userId', verifyToken, async (req, res) => {
    const { userId } = req.params;
    try {
        const removeUser = await User.deleteOne({ _id: userId });
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch('/:userId', verifyToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const updatedUser = await User.updateOne({ _id: userId }, {
            $set: {
                ...req.body
            }
        });
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;