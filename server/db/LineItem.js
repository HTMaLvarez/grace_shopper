const conn = require('./conn');
const { INTEGER, STRING, UUID, UUIDV4 } = conn.Sequelize;

const LineItem = conn.define('lineItem', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  // converted id to STRING to match new id on product model... the updated 'stripe id'
  // orignal code below
  productId: {
    type: STRING,
    allowNull: false,
  },
  orderId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = LineItem;
