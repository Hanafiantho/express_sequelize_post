'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.removeColumn('posts', 'title');
    },

    async down(queryInterface, Sequelize) {
        queryInterface.addColumn('posts', 'title', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
