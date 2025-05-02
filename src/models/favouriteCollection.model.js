const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class FavoriteCollection extends Model {}

FavoriteCollection.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'FavoriteCollection',
  tableName: 'favorite_collections'
});

module.exports = FavoriteCollection;