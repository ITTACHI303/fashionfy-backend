const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

class ModelService {
  static async generateModel(measurements) {
    // Validate required measurements
    const requiredFields = ['shoulders', 'waist', 'length', 'arm', 'chest', 'wrist', 'shirt_size'];
    const missingFields = requiredFields.filter(field => !(field in measurements));
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    return {
      generationId: uuidv4(),
      status: 'completed',
      modelUrl: '/dummy-shirt-model.glb',
      measurements: measurements,
      dimensions: this.calculateShirtDimensions(measurements),
      timestamp: new Date().toISOString()
    };
  }

  static calculateShirtDimensions(measurements) {
    // Realistic mock calculations for shirt dimensions
    return {
      chest_circumference: measurements.chest,
      shoulder_width: measurements.shoulders,
      sleeve_length: measurements.arm * 1.05, // Add 5% ease
      shirt_length: measurements.length + 2, // Add 2cm hem
      wrist_opening: measurements.wrist * 1.1 // Add 10% ease
    };
  }

  static getDummyModel() {
    const dummyPath = path.join(__dirname, '../public/dummy-shirt-model.glb');
    if (!fs.existsSync(dummyPath)) {
      fs.writeFileSync(dummyPath, ''); // Create empty file
    }
    return dummyPath;
  }
}

module.exports = ModelService;