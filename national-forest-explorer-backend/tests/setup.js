const { sequelize } = require('../models');
const { app, server } = require('../index');
const request = require('supertest');

module.exports = async () => {
    process.env.PORT = 3002;
    await sequelize.sync({ force: true });
    global.testRequest = request(app);
};
