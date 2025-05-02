const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ModelGeneration = sequelize.define('ModelGeneration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  measurementId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  modelPath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = ModelGeneration;