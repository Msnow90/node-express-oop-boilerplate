const express                       = require("express");
const expressSanitizer              = require('express-sanitizer');


const app = express();

// dependency containers
const setup = require('./src/dep-injection');
setup();

// middleware
app.use(expressSanitizer());

// service routes
const userServiceRoutes = require('./src/api-routes/user');

// Default Routes Setup

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'You did it!' })
})

app.use('/api', userServiceRoutes);

app.get('*', (req, res, next) => {
    res.status(404).json({ message: 'Failed to fetch resource.' });
})


module.exports = app;

