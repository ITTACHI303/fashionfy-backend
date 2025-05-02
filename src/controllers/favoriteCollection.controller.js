const FavoriteCollectionService = require('../services/favoriteCollection.service');

class FavoriteCollectionController {
  static async createCollection(req, res) {
    try {
      const { userId, name } = req.body;
      const collection = await FavoriteCollectionService.createCollection(userId, name);
      res.status(201).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getCollectionsByUser(req, res) {
    try {
      const { userId } = req.params;
      const collections = await FavoriteCollectionService.getCollectionsByUser(userId);
      res.status(200).json(collections);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async addFavoriteToCollection(req, res) {
    try {
      const { collectionId, userId, productId } = req.body;
      const favorite = await FavoriteCollectionService.addFavoriteToCollection(collectionId, userId, productId);
      res.status(201).json(favorite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteCollection(req, res) {
    try {
      const { collectionId } = req.params;
      await FavoriteCollectionService.deleteCollection(collectionId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async removeFavoriteFromCollection(req, res) {
    try {
      const { collectionId, productId } = req.body;
      await FavoriteCollectionService.removeFavoriteFromCollection(collectionId, productId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = FavoriteCollectionController;