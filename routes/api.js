const express = require('express');

const app = express();

const usersRoute = require('./users.route');
const filesRoute = require('./files.route');
const productsRoute = require('./products.route');

app.use(usersRoute);
app.use(filesRoute);
app.use(productsRoute);

module.exports = app;
