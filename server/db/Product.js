const conn = require('./conn');
const { STRING, UUID, UUIDV4, FLOAT } = conn.Sequelize;

const Product = conn.define('product', {
  // updated the id to match STRIPE STORE env 'id'
  // original is below
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
  // added a price attribute - type: FLOAT
  price: {
    type: FLOAT,
  },
});

module.exports = Product;

// const Product = conn.define('product', {
//   id: {
//     type: UUID,
//     primaryKey: true,
//     defaultValue: UUIDV4
//   },
//   name: {
//     type: STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
// });
