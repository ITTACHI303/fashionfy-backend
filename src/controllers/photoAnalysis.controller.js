const PhotoAnalysisService = require('../services/photoAnalysis.service');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

class PhotoAnalysisController {
  static async analyzePhoto(req, res) {
    try {
      const userId = req.user.id;
      const { files, body } = req;
      const heightCm = parseFloat(body.height_cm);

      if (!files?.image_front || !files?.image_side) {
        return res.status(400).json({ message: 'Both front and side images are required' });
      }

      const [imageFrontFile, imageSideFile] = [files.image_front[0], files.image_side[0]];

      // Convert images to PNG
      const processImage = async (file) => {
        const pngPath = path.join('uploads/temp', `converted-${Date.now()}-${file.originalname}.png`);
        await sharp(file.path)
          .rotate() // fixes orientation based on EXIF
          .toFormat('png')
          .toFile(pngPath);
        return pngPath;
      };

      const imageFrontPath = await processImage(imageFrontFile);
      const imageSidePath = await processImage(imageSideFile);

      // Get measurements from Python service
      const analysis = await PhotoAnalysisService.analyzePhoto(userId, imageFrontPath, imageSidePath, heightCm);

      // Cleanup temporary files
      await Promise.all([
        unlinkAsync(imageFrontFile.path),
        unlinkAsync(imageSideFile.path),
        unlinkAsync(imageFrontPath),
        unlinkAsync(imageSidePath),
      ]).catch(err => console.error('Error deleting temp files:', err));

      res.status(200).json(analysis);
    } catch (error) {
      console.error('Error analyzing photo:', error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async getAnalysisHistory(req, res) {
    try {
      const userId = req.user.id;
      const history = await PhotoAnalysisService.getAnalysisHistory(userId);
      res.status(200).json(history);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAnalysisById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const analysis = await PhotoAnalysisService.getAnalysisById(id, userId);
      res.status(200).json(analysis);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PhotoAnalysisController;