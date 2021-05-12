'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'productId',
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t}
        )
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn(
          'users',
          'productId',
          { transaction: t }
        )
      ])
    })
  }
};
