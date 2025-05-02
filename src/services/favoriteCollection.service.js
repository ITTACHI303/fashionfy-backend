const FavoriteCollection = require('../models/favouriteCollection.model');
const Favorite = require('../models/favorite.model');

class FavoriteCollectionService {
  static async createCollection(userId, name) {
    return FavoriteCollection.create({ userId, name });
  }

  static async getCollectionsByUser(userId) {
    return FavoriteCollection.findAll({ where: { userId }, include: [Favorite] });
  }

  static async addFavoriteToCollection(collectionId, userId, productId) {
    return Favorite.create({ collectionId, userId, productId });
  }

  static async deleteCollection(collectionId) {
    const collection = await FavoriteCollection.findByPk(collectionId);
    if (!collection) {
      throw new Error('Collection not found');
    }
    return collection.destroy();
  }

  static async removeFavoriteFromCollection(collectionId, productId) {
    const favorite = await Favorite.findOne({ where: { collectionId, productId } });
    if (!favorite) {
      throw new Error('Favorite not found in collection');
    }
    return favorite.destroy();
  }
}

module.exports = FavoriteCollectionService;