const Product = require('../models/products.model');
const Category = require('../models/category.model');
const Brand = require('../models/brand.model');
const { Op } = require('sequelize'); // Import Sequelize operators for search

class ProductService {
  static async createProduct(data) {
    return Product.create(data);
  }

  static async getProductById(id) {
    return Product.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { model: Brand, as: 'brand' }
      ]
    });
  }

  static async getAllProducts() {
    return Product.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Brand, as: 'brand' }
      ]
    });
  }

  static async searchProducts(searchTerm) {
    return Product.findAll({
      where: {
        name: { [Op.iLike]: `%${searchTerm}%` }
      },
      include: [
        { model: Category, as: 'category' },
        { model: Brand, as: 'brand' }
      ]
    });
  }

  static async updateProduct(id, data) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product.update(data);
  }

  static async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product.destroy();
  }
}

module.exports = ProductService;