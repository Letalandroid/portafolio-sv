const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const morgan = require('morgan');
const rutasGenerales = require('./routes/general.routes');
const override = require("method-override");

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(override("_method"));
app.use(rutasGenerales);

// DB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () { return console.log('DB Connected'); })["catch"](function (err) { return console.log(err); });

module.exports = app;