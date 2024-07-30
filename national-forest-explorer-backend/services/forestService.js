const { Forest } = require("../models");
// Retrieve all forest records from the database
const getAllForests = async () => {
  return await Forest.findAll();
};

module.exports = {
  getAllForests,
};
