module.exports = (sequelize, DataTypes) => {
  const recipeSchema = {
    description: {
      type: DataTypes.STRING,
    },
    positivePoints: {
      type: DataTypes.BIGINT,
    },
    negativePoints: {
      type: DataTypes.BIGINT,
    },
    comments: {
      type: DataTypes.STRING(6000),
    },
  }

  const recipeOps = {
    timestamps: true,
    tableName: 'recipes'
  }

  const Recipe = sequelize.define('Recipe', recipeSchema, recipeOps)

  return Recipe
}
