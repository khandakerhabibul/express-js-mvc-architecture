const { Products } = require('../models/product.model');

// Create products , POST request , async function cause storing data in db can take time
const createProducts = async (req, res) => {
  try {
    // Get data from request body
    const { title, price, description, rating, email } = req.body;
    console.log({ ...req.body });

    // Model import kore data save korte hobe, model e fit kora hocche data
    const newProduct = new Products({
      title,
      price,
      description,
      rating,
      email,
    });

    // Save data in database
    const productData = await newProduct.save(); // Single document save

    // Multiple document save
    // const productData = await Products.insertMany([
    //   {
    //     title: title + '1',
    //     price,
    //     description,
    //   },
    //   {
    //     title: title + '2',
    //     price,
    //     description,
    //   },
    // ]); // Multiple document save

    console.log({ productData });

    res.status(201).json({
      message: 'Product created successfully',
      data: productData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    // const { limit = 10 } = req.query; // query parameter , default limit 10
    // console.log({ limit });
    // const allProducts = await Products.find(); // .limit(Number(limit));
    const { greaterThan, rating, sortBy } = req.query;
    let allProducts;

    //  allProducts = await Products.find({
    //   price: { $in: [300, 1300, 1200] }, // multiple value equal check kora
    // });

    // Logical operator implement
    // allProducts = await Products.find({
    //   $and: [{ price: { $gt: 1000 } }, { rating: { $gte: 4 } }], // multiple condtion apply with and , $or , $not, $nor, $and
    // });

    if (greaterThan && rating) {
      allProducts = await Products.find({
        // price: { $gt: Number(greaterThan) },
        $or: [
          { price: { $gt: Number(greaterThan) } },
          { rating: { $gte: Number(rating) } },
        ],
        // $and: [
        //   { price: { $gt: Number(greaterThan) } },
        //   { rating: { $gte: rating } },
        // ],
      })
        .sort({ price: sortBy === 'asc' ? 1 : -1 }) // 1 for ascending 1,2,3 , -1 for descending 3,2,1
        .select({ title: 1 });
      // .countDocuments(); // count korbe direct db te , ekhaner limit shoho na , using this function only returns number instead of data
    } else {
      allProducts = await Products.find()
        .sort({
          price: sortBy === 'asc' ? 1 : -1,
        })
        .select({ title: 1 });
    }

    console.log({ sortBy });

    if (allProducts) {
      res.status(200).json({
        message: 'All products fetched successfully',
        count: allProducts.length,
        data: allProducts,
      });
    } else {
      res.status(404).json({
        message: 'No products found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });

    if (!id) {
      res.status(400).json({
        message: 'Id is required',
      });
    }

    // Different ways to search data from mongodb
    // const product = await Products.findById(id); // Mongodb _id search
    // const product = await Products.find({ _id: id });
    const product = await Products.findOne({ _id: id });
    // const product = await Products.findOne({ _id: id }).select({ // select specific field, showing specific field
    //   title: 1,
    //   price: 1,
    //   _id: 0,
    // });
    // const product = await Products.findOne(
    //   { _id: id },
    //   { title: 1, price: 1, _id: 0 } // select specific field, showing specific field , same thing like .select
    // );

    console.log({ product });

    if (product._id) {
      res.status(200).json({
        message: 'Product fetched successfully',
        data: product,
      });
    } else {
      res.status(404).json({
        message: 'No product found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });

    if (!id) {
      res.status(400).json({
        message: 'Id is required',
      });
    }

    const deletedProduct = await Products.findByIdAndDelete(id); // return deleted data, got deleted data here
    // const deletedProduct = await Products.findOne({ _id: id });
    // const deletedProduct = await Products.deleteOne({ _id: id }); // dont return deleted data , Delete one document

    if (deletedProduct) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: deletedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No product found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });

    if (!id) {
      res.status(400).json({
        message: 'Id is required',
      });
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // return updated data
    );

    if (updatedProduct) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No product found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProducts,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
