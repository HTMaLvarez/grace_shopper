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
  const [
    maria,
    irwing,
    scott,
    castlevania4,
    zelda2,
    contra,
    superMario3,
    streetFighter2,
    residentEvil,
    doug,
  ] = await Promise.all([
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
    // created 6 new products with 'id' from stripe

    Product.create({
      id: 'price_1MbcWgIgQNSadm7JTexkCvvj',
      name: 'Castlevania IV',
      price: 49.99,
      imageURL: 'castlevaniaIV.jpeg',
      description:
        "Super Castlevania IV features expanded play control, 16-bit graphics featuring Super NES's Mode 7, and a soundtrack featuring new pieces and arrangements based on previous Castlevania music. Following the same setting as Castlevania on the NES, the game takes place in 1691 Transylvania, where the vampire hunter Simon Belmont must defeat the vampire Dracula.",
    }),
    Product.create({
      id: 'price_1MbcZLIgQNSadm7JJ8AfZQmE',
      name: 'Zelda II',
      price: 49.99,
      imageURL: 'zelda2.jpeg',
      description:
        "The Adventure of Link is a direct sequel to the original The Legend of Zelda, again involving the protagonist Link, on a quest to save Princess Zelda, who has fallen under a sleeping spell. The game's emphasis on side-scrolling and role-playing elements is a significant departure from its predecessor.",
    }),
    Product.create({
      id: 'price_1MbcaXIgQNSadm7JYAUdXRBt',
      name: 'Contra',
      price: 49.99,
      imageURL: 'contra.jpeg',
      description:
        'Contra is a run-and-gun shooter video game developed and published by Konami, originally developed as a coin-operated arcade game in 1986 and released on February 20, 1987. A home version was released for the Nintendo Entertainment System in 1988, along with ports for various home computer formats, including the MSX2.',
    }),
    Product.create({
      id: 'price_1MbcbxIgQNSadm7JXxyT1GVP',
      name: 'Super Mario 3',
      price: 49.99,
      imageURL: 'superMario3.jpeg',
      description:
        'Super Mario Bros. 3 is a platform game developed and published by Nintendo for the Nintendo Entertainment System (NES). It was released for home consoles in Japan on October 23, 1988, in North America on February 12, 1990 and in Europe on August 29, 1991. It was developed by Nintendo Entertainment Analysis and Development, led by Shigeru Miyamoto and Takashi Tezuka.',
    }),
    Product.create({
      id: 'price_1MbceNIgQNSadm7JTf8FZHZA',
      name: 'Street Fighter 2',
      price: 49.99,
      imageURL: 'streetFighter2.jpeg',
      description:
        "Street Fighter II: The World Warrior[b] is a fighting game developed by Capcom and originally released for arcades in 1991. It is the second installment in the Street Fighter series and the sequel to 1987's Street Fighter. It is Capcom's fourteenth game to use the CP System arcade system board.",
    }),
    Product.create({
      id: 'price_1MbcfiIgQNSadm7Jx2Ikjn5w',
      name: 'Resident Evil 2',
      price: 49.99,
      imageURL: 'residentEvil.jpeg',
      description:
        'Resident Evil 2 is a 1998 survival horror video game developed and published by Capcom for the PlayStation. The player controls Leon S. Kennedy and Claire Redfield, who must escape Raccoon City after its citizens are transformed into zombies by a biological weapon two months after the events of the original Resident Evil.',
    }),
    // Product.create({ name: 'Sonic The Hedgehog' }),
    // Product.create({ name: 'Mario Kart' }),
    // Product.create({ name: 'Donkey Kong Country' }),

    User.create({
      username: 'Doug',
      password: '123',
      favoriteGenres: 'sports, fighting',
      userRating: 9.2,
    }),
  ]);

  const cart = await doug.getCart();
  await doug.addToCart({ product: zelda2, quantity: 3 });
  await doug.addToCart({ product: streetFighter2, quantity: 2 });
  return {
    users: {
      maria,
      irwing,
      scott,
    },
    products: {
      castlevania4,
      zelda2,
      contra,
      superMario3,
      streetFighter2,
      residentEvil,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
};
