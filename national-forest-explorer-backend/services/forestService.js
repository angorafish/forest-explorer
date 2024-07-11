const { Forest } = require('../models');

const getAllForests = async () => {
    return await Forest.findAll();
};

module.exports = {
    getAllForests,
};
