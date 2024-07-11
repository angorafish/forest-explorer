const { Trail } = require('../models');

const getAllTrails = async () => {
    return await Trail.findAll();
};

module.exports = {
    getAllTrails,
};