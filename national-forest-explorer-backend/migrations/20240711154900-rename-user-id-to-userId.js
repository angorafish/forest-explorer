'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('reviews', 'user_id', 'userId');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('reviews', 'userId', 'user_id');
    },
};