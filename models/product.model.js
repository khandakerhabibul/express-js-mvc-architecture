const mongoose = require('mongoose');
const { productSchema } = require('../schema/productSchema');

// Database -> Table -> record || row
// Database -> Collections -> Documents

const Products = mongoose.model('Products', productSchema);

module.exports = { Products };
