const conn = require('./conn');
const { STRING, UUID, UUIDV4, FLOAT, TEXT } = conn.Sequelize;

const Product = conn.define('product', {
  // updated the id to match STRIPE STORE env 'id'
  id: {
    type: STRING,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: FLOAT,
  },
  imageURL: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
});

module.exports = Product;
