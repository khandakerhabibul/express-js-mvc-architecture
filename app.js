const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const apiRouter = require('./routes/api');

const app = express();

// Allowing CORS for sharing all resources from all origins
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Using when we have json data in req body
// parse application/json
app.use(bodyParser.json()); // app.use(express.json());

app.use(express.static('public'));

const myMiddleware = (req, res, next) => {
  console.log('This is my middleware');
  // we can add new things in req object
  next();
};

app.use(myMiddleware); // This will be applied to all routes

// Routers
app.use(apiRouter);

// Using when we have form data
// for parsing multipart/form-data
app.use(upload.array());

app.use((req, res, next) => {
  res.status(404).send('Not found resource!');
});

module.exports = app;
