const express = require('express');
const router = express.Router();
const Message = require('../models/messages.js');
const verifyToken = require('../helpers');
const bcrypt = require('bcrypt');
require('dotenv/config');

router.get('/', verifyToken, async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages)
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/add', async (req, res) => {
    console.log('entro')
    console.log(req.body)

    try {
        const messages = Message({
            ...req.body
        });
        const savedMessage = await messages.save();
        res.json({message: 'successfull'})

    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:messageId', verifyToken, async (req, res) => {
    const { messageId } = req.params;
    try {
        const removeMessage = await Message.deleteOne({ _id: messageId });
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch('/:messageId', verifyToken, async (req, res) => {
    const { messageId } = req.params;

    try {
        const updatedMessage = await Message.updateOne({ _id: messageId }, {
            $set: {
                ...req.body
            }
        });
        res.json(updatedMessage)
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;