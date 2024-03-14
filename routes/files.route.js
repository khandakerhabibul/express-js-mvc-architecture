const express = require('express');
const { singleFileUpload } = require('../controllers/files.controller');
const { upload } = require('../helper/fileUploadService');
const urlFormatter = require('../helper/urlFormatter');

const router = express.Router();

router.post(urlFormatter('upload'), upload.single('img'), singleFileUpload);

module.exports = router;
