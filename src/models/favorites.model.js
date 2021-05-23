module.exports = (sequelize, DataTypes) => {
  const favoriteSchema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
