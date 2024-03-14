const express = require('express');
const {
  createProducts,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} = require('../controllers/products.controller');
const urlFormatter = require('../helper/urlFormatter');
const router = express.Router();

router.post(urlFormatter('product/create'), createProducts);
router.get(urlFormatter('products'), getAllProduct);
router.get(urlFormatter('products/:id'), getProductById);
router.delete(urlFormatter('products/:id/delete'), deleteProductById);
router.put(urlFormatter('products/:id/update'), updateProductById);

module.exports = router;
