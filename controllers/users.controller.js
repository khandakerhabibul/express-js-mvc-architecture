// const users = require('../models/users.model');
const { DUMMY_PURCHASE_REQUEST, users } = require('../models/users.model');

const getUser = (req, res) => {
  // return res.status(404).json({
  //   message: 'Not found',
  // });
  const { page } = req.query;
  const searchFilter = req.query['filter[search_by_name]'];

  return res.status(200).json({
    status: 'success',
    data: {},
  });
};

const createUser = (req, res) => {
  const { value_presentation, email } = req.body;

  if (!value_presentation) {
    res.status(400).json({
      message: 'value_presentation is required',
    });
  }

  const newUser = {
    value: users.length + 1,
    value_presentation,
    email,
  };
  users.push(newUser);
  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
};

const purchaseRequestById = (req, res) => {
  console.log('HITTING');
  const { id } = req.params;
  // const searchFilter = req.query['filter[search_by_name]'];

  return res.status(200).json({ status: 'success', data: {} });
};

module.exports = {
  getUser,
  createUser,
  purchaseRequestById,
};
