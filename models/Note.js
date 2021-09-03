const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: false,

    }

    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // date: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'genre',
        key: 'id',
      },
    },

  },
  {
      /*
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    */
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Note;
