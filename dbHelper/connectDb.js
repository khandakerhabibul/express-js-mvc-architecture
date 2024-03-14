const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testProductDb');

    console.log('DB successfully connected');
  } catch (error) {
    console.log('Connect Db error', error);
  }
};

module.exports = connectDb;
