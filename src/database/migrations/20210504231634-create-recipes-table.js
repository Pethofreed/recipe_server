'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'recipes',
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.BIGINT,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.DataTypes.STRING(6000),
          allowNull: false,
        },
        positivePoints: {
          type: Sequelize.DataTypes.BIGINT,
          allowNull: true,
        },
        negativePoints: {
          type: Sequelize.DataTypes.BIGINT,
          allowNull: true,
        },
        comments: {
          type: Sequelize.DataTypes.STRING(6000),
          allowNull: true,
        },

        createdAt: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE,
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipes')
  }
};
