const express = require('express');
const FavoriteCollectionController = require('../controllers/favoriteCollection.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Favorite Collection Routes
router.post('/create', AuthMiddleware.authenticateUser, FavoriteCollectionController.createCollection);
router.get('/user/:userId', AuthMiddleware.authenticateUser, FavoriteCollectionController.getCollectionsByUser);
router.post('/add-favorite', AuthMiddleware.authenticateUser, FavoriteCollectionController.addFavoriteToCollection);
router.delete('/delete/:collectionId', AuthMiddleware.authenticateUser, FavoriteCollectionController.deleteCollection);
router.delete('/remove-favorite', AuthMiddleware.authenticateUser, FavoriteCollectionController.removeFavoriteFromCollection);

module.exports = router;