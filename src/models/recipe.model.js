module.exports = (sequelize, DataTypes) => {
  const recipeSchema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(6000),
      allowNull: false,
    },
    positivePoints: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    negativePoints: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING(6000),
      allowNull: true,
    },
  }

  const recipeOps = {
    timestamps: true,
    tableName: 'recipes'
  }

  const Recipe = sequelize.define('Recipe', recipeSchema, recipeOps)

  Recipe.associate = (db) => {
    db.Recipe.belongsTo(db.User)
  }

  return Recipe
}
