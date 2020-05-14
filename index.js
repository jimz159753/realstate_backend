const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Settings

// Middlewares
app.use(cors())
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// Import Routes
const usersRoute = require('./routes/users');
const messagesRoute = require('./routes/messages');

// const cartsRoute = require('./routes/carts');

app.use('/api/users', usersRoute);
app.use('/api/messages', messagesRoute);

// Routes
app.get('/', (req, res) => {
    res.send('we are on home')
})

// Connect To DB
const connect = mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to DB'))
    .catch(err => console.log(err))

// Starting server
app.listen(6000, () => {
    console.log('server on port 6000')
});