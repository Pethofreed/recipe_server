module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    speciality: {
      type: DataTypes.STRING,
    },
  }

  const userOps = {
    timestamps: true,
    tableName: 'users'
  }

  const User = sequelize.define('User', userSchema, userOps)

  return User
}
