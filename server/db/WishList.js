const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Wish = conn.define('wish', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  game: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Wish;
