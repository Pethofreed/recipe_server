'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'recipes',
          'userid',
          {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          { transaction: t }
        )
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(
          'recipes',
          'userid',
          { transaction: t }
        )
      ])
    })
  }
};