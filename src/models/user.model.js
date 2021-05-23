module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
    },
  }

  const userOps = {
    timestamps: true,
    tableName: 'users'
  }

  const User = sequelize.define('User', userSchema, userOps)

  User.associate = (db) => {
    db.User.hasMany(db.Recipe)
  }

  return User
}
