const express = require('express');
const FavoriteController = require('../controllers/favorite.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Favorite Routes
router.post('/add', AuthMiddleware.authenticateUser, FavoriteController.addFavorite);
router.get('/user/:userId', AuthMiddleware.authenticateUser, FavoriteController.getFavoritesByUser);
router.get('/collection/:collectionId', AuthMiddleware.authenticateUser, FavoriteController.getFavoritesByCollection);
router.get('/user/:userId/collection/:collectionId/search', AuthMiddleware.authenticateUser, FavoriteController.searchFavorites); // New search route
router.delete('/delete', AuthMiddleware.authenticateUser, FavoriteController.deleteFavorite);

module.exports = router;