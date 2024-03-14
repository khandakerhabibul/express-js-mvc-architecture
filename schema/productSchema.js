const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    trim: true,
    minlength: 3,
    maxlegth: [10, 'Title can not be more than 10 characters!'],
    lowercase: true,
    // enum: ['mobile', 'laptop', 'tv'], // only these values are allowed in title , otherwise error
  },
  price: {
    type: Number,
    min: [100, 'Price can not be less than 100!'],
    max: [3000, 'Price can not be more than 3000!'],
    required: [true, 'Price is required!'],
    // validate: {
    //   validator: function (value) {
    //     return value % 2 === 0;
    //   },
    //   message: 'Price must be even number!',
    // },
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is required!'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      // Custom validation
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: 'Email must be valid!',
    },
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {
  productSchema,
};
