const express = require('express');
const router = express.Router();
const modelController = require('../controllers/model.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.post('/generate', AuthMiddleware.authenticateUser, modelController.generateModel);
router.get('/status/:id', AuthMiddleware.authenticateUser, modelController.getModel);
// router.get('/dummy/download', modelController.downloadDummyModel);
// router.get('/dummy/preview', modelController.getPreview);

module.exports = router;