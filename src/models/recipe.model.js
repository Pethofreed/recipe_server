module.exports = (sequelize, DataTypes) => {
  const recipeSchema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(6000),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positivePoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    negativePoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING(6000),
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
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
