const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    title: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, { timestamps: true })

module.exports = mongoose.model('Messages', messageSchema);