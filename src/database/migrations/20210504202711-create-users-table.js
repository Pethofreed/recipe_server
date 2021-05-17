'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        speciality: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        picture: {
          type: Sequelize.DataTypes.STRING,
        },

        createdAt: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE,

      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}


