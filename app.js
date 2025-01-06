const express = require('express');

const app = express(); 

const logger = require("morgan"); // For logging

const cors = require('cors');

const constituentRoutes = require('./api/routes/constituents');

app.use(logger('dev'));

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

app.use('/constituents', constituentRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        error: {
            message: error.message
        }
    }); 
});


module.exports = app;