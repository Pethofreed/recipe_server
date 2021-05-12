'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'recipes',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        duration: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.DataTypes.STRING(6000),
          allowNull: false,
        },
        level: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        positivePoints: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        negativePoints: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        comments: {
          type: Sequelize.DataTypes.STRING(6000),
          allowNull: true,
        },
        picture: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        UserId: {
          type: Sequelize.DataTypes.INTEGER,
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
