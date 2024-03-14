// const users = require('../models/users.model');
// const { users } = require('../models/users.model');

const singleFileUpload = (req, res) => {
  console.log('files route upload', req.body);

  // TODO file upload handle here
  res.status(200).send('File uploaded successfully');
};

module.exports = {
  singleFileUpload,
};
