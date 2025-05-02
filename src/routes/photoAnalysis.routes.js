const express = require('express');
const PhotoAnalysisController = require('../controllers/photoAnalysis.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
// const upload = require('../config/multer.config');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Photo Analysis Routes
// router.post('/analyze', 
//   AuthMiddleware.authenticateUser, 
//   upload.single('photo'), 
//   PhotoAnalysisController.analyzePhoto
// );

router.post(
  '/analyze',
  AuthMiddleware.authenticateUser,
  upload.fields([
    { name: 'image_front', maxCount: 1 },
    { name: 'image_side', maxCount: 1 },
  ]),
  PhotoAnalysisController.analyzePhoto
);
router.get('/history', 
  AuthMiddleware.authenticateUser, 
  PhotoAnalysisController.getAnalysisHistory
);
router.get('/:id', 
  AuthMiddleware.authenticateUser, 
  PhotoAnalysisController.getAnalysisById
);

module.exports = router;