const conn = require('./conn');
const { TEXT, UUID, UUIDV4, INTEGER } = require('sequelize');

const ProductReview = conn.define('productReview', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  review: {
    type: TEXT,
    allowNull: true,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

module.exports = ProductReview;
