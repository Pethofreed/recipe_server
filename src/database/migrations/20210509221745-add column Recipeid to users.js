'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'productid',
          {
            type: Sequelize.DataTypes.BIGINT,
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
          'productid',
          { transaction: t }
        )
      ])
    })
  }
};
