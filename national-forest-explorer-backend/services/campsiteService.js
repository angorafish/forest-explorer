const { Campsite } = require('../models');

const getAllCampsites = async () => {
    return await Campsite.findAll();
};

module.exports = {
    getAllCampsites,
};
