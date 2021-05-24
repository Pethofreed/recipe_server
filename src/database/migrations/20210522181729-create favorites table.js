'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'favorites',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userid: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        recipeid: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE,
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favorites')
  }
};
