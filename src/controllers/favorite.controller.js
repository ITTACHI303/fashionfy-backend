const FavoriteService = require('../services/favorite.service');

class FavoriteController {
  static async addFavorite(req, res) {
    try {
      const { userId, productId, collectionId } = req.body;
      const favorite = await FavoriteService.addFavorite(userId, productId, collectionId);
      res.status(201).json(favorite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getFavoritesByUser(req, res) {
    try {
      const { userId } = req.params;
      const favorites = await FavoriteService.getFavoritesByUser(userId);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getFavoritesByCollection(req, res) {
    try {
      const { collectionId } = req.params;
      const favorites = await FavoriteService.getFavoritesByCollection(collectionId);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async searchFavorites(req, res) {
    try {
      const { userId, collectionId } = req.params; // Get userId and collectionId from route parameters
      const { searchTerm } = req.query; // Search term passed as a query parameter
      const favorites = await FavoriteService.searchFavorites(userId, collectionId, searchTerm);
      res.status(200).json(favorites);
    } catch (error) {
      console.log(error); // Log the error for debugging
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteFavorite(req, res) {
    try {
      const { userId, productId, collectionId } = req.body;
      await FavoriteService.deleteFavorite(userId, productId, collectionId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = FavoriteController;