const Brand = require('../models/brand.model');
const { Op } = require('sequelize'); // Import Sequelize operators for search

class BrandService {
  static async createBrand(data) {
    return Brand.create(data);
  }

  static async getBrandById(id) {
    return Brand.findByPk(id);
  }

  static async getAllBrands() {
    return Brand.findAll();
  }

  static async searchBrands(searchTerm) {
    return Brand.findAll({
      where: {
        name: { [Op.iLike]: `%${searchTerm}%` } // Case-insensitive search by name
      }
    });
  }

  static async updateBrand(id, data) {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw new Error('Brand not found');
    }
    return brand.update(data);
  }

  static async deleteBrand(id) {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw new Error('Brand not found');
    }
    return brand.destroy();
  }
}

module.exports = BrandService;