const { sequelize } = require('../models');
const { app, server } = require('../index');
const request = require('supertest');
const { setupServer } = require('./index');

module.exports = async () => {
    await sequelize.sync();
    global.testRequest = request(app);
    global.server = server;
};
