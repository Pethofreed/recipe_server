'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.DataTypes.BIGINT,
          primaryKey: true,
          autoincrement: true
        },
        name: {
          type: Sequelize.DataTypes.STRING,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
        },
        speciality: {
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


