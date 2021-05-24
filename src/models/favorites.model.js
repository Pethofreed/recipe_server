module.exports = (sequelize, DataTypes) => {
  const favoriteSchema = {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }

  const favoriteOps = {
    timestamps: true,
    tableName: 'favorites'
  }

  const Favorite = sequelize.define('Favorite', favoriteSchema, favoriteOps)

  return Favorite
}
