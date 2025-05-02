const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const FavoriteCollection = require('./favouriteCollection.model'); // Import the new model
const Product = require('./products.model'); // Assuming you have a Product model

class Favorite extends Model {}

Favorite.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  collectionId: { // New field for associating with a collection
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: FavoriteCollection,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Favorite',
  tableName: 'favorites'
});

// Define associations
Favorite.belongsTo(Product, { foreignKey: 'productId' }); // Associate Favorite with Product
Favorite.belongsTo(FavoriteCollection, { foreignKey: 'collectionId' });
FavoriteCollection.hasMany(Favorite, { foreignKey: 'collectionId' });

module.exports = Favorite;