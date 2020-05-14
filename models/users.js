const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    privilege: String
}, { timestamps: true })

module.exports = mongoose.model('Users', userSchema);