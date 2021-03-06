module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    email: {
      type: DataTypes.STRING
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profPic: {
      type: DataTypes.STRING,
      defaultValue: "./imges/a2.png"
    }
  });

  Users.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Users.hasMany(models.Post, {
      onDelete: "cascade"
    });
    Users.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };

  return Users;
};
