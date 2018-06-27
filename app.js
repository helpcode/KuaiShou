const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config.json')

const indexRouter = require('./routes/user.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(`${config.apiBase}`, indexRouter);

// error handler
app.use(function(err, req, res, next) {
  res.json({
    status: err
  });
});

module.exports = app;
