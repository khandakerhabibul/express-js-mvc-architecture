const express = require('express');
const {
  createUser,
  getUser,
  purchaseRequestById,
} = require('../controllers/users.controller');
const urlFormatter = require('../helper/urlFormatter');

const router = express.Router();

router.get(urlFormatter('users/all'), getUser);

router.post(urlFormatter('users/create'), createUser);

router.get(urlFormatter('purchase_requests/:id'), purchaseRequestById);

module.exports = router;
