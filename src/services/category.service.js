const Category = require('../models/category.model');
const { Op } = require('sequelize'); // Import Sequelize operators for search

class CategoryService {
  static async createCategory(data) {
    return Category.create(data);
  }

  static async getCategoryById(id) {
    return Category.findByPk(id);
  }

  static async getAllCategories() {
    return Category.findAll();
  }

  static async searchCategories(searchTerm) {
    return Category.findAll({
      where: {
        name: { [Op.iLike]: `%${searchTerm}%` } // Case-insensitive search by name
      }
    });
  }

  static async updateCategory(id, data) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category.update(data);
  }

  static async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category.destroy();
  }
}

module.exports = CategoryService;