'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'recipes',
      {
        id: {
          autoincrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.BIGINT,
        },
        Authorid: {
          type: Sequelize.DataTypes.BIGINT,
        },
        description: {
          type: Sequelize.DataTypes.STRING(6000),
        },
        positivePoints: {
          type: Sequelize.DataTypes.BIGINT,
        },
        negativePoints: {
          type: Sequelize.DataTypes.BIGINT,
        },
        comments: {
          type: Sequelize.DataTypes.STRING(6000),
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
