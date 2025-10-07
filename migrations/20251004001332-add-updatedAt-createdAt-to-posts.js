'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('comments', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
        });

        await queryInterface.addColumn('comments', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('comments', 'createdAt');
        await queryInterface.removeColumn('comments', 'updatedAt');
    },
};
