const Favorite = require('../models/favorite.model');
const Product = require('../models/products.model'); // Import the Product model
const FavoriteCollection = require('../models/favouriteCollection.model'); // Import the FavoriteCollection model
const { Op } = require('sequelize'); // Import Sequelize operators for search functionality

class FavoriteService {
  static async addFavorite(userId, productId, collectionId = null) {
    return Favorite.create({ userId, productId, collectionId });
  }

  static async getFavoritesByUser(userId) {
    return Favorite.findAll({
      where: { userId },
      include: [FavoriteCollection], // Include collection details
    });
  }

  static async getFavoritesByCollection(collectionId) {
    return Favorite.findAll({
      where: { collectionId },
      include: [Product], // Include product details
    });
  }

  static async searchFavorites(userId, collectionId, searchTerm) {
    return Favorite.findAll({
      where: {
        userId,
        collectionId, // Filter by collectionId
      },
      include: [
        {
          model: Product, // Include the Product model
          as: 'Product', // Alias for the Product model
          where: {
            name: { [Op.like]: `%${searchTerm}%` }, // Search by product name
          },
        },
      ],
    });
  }

  static async deleteFavorite(userId, productId, collectionId = null) {
    const favorite = await Favorite.findOne({ where: { userId, productId, collectionId } });
    if (!favorite) {
      throw new Error('Favorite not found');
    }
    return favorite.destroy();
  }
}

module.exports = FavoriteService;