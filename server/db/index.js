const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [maria, irwing, scott, sonic, mario, donkey, doug] = await Promise.all([
    User.create({
      username: 'Maria',
      password: '123',
      favoriteGenres: 'sports, fighting, plants',
      userRating: 8.7,
    }),
    User.create({
      username: 'Irwing',
      password: '123',
      favoriteGenres: 'platformers, fighting, rpg',
      userRating: 9.0,
    }),
    User.create({
      username: 'Scott',
      password: '123',
      favoriteGenres: 'brawlers, sports, rpg',
      userRating: 8.3,
    }),
    Product.create({ name: 'Sonic The Hedgehog' }),
    Product.create({ name: 'Mario Kart' }),
    Product.create({ name: 'Donkey Kong Country' }),
    User.create({ username: 'Doug', password: '123', userRating: 9.2 }),
  ]);

  const cart = await doug.getCart();
  await doug.addToCart({ product: mario, quantity: 3 });
  await doug.addToCart({ product: sonic, quantity: 2 });
  return {
    users: {
      maria,
      irwing,
      scott,
    },
    products: {
      sonic,
      mario,
      donkey,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
};
