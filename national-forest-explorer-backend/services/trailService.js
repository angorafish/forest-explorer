const { Trail } = require("../models");
// Retrieve all trail records from the database
const getAllTrails = async () => {
  return await Trail.findAll();
};

module.exports = {
  getAllTrails,
};
