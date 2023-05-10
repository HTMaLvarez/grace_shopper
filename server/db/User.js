const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, FLOAT } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

const User = conn.define(
  'user',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    username: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    favoriteGenres: {
      type: TEXT,
      allowNull: true,
    },
    userRating: {
      type: FLOAT,
      allowNull: true,
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        console.log(user);
        console.log('-----------');
        const newUser = user.dataValues;
        console.log(newUser);
        newUser.password = await bcrypt.hash(
          newUser.password,
          8
          // parseInt(process.env.ROUNDS) || 8
        );
        console.log(
          await bcrypt.compareSync(user.dataValues.password, newUser.password)
        );
        console.log(newUser.password);
      },
      // async beforeUpdate(user) {
      //   console.log(user);
      //   console.log('-----------');
      //   const updatedUser = user.dataValues;
      //   console.log(updatedUser);
      //   updatedUser.password = await bcrypt.hash(
      //     updatedUser.password,
      //     8
      //     // parseInt(process.env.ROUNDS) || 8
      //   );
      //   console.log(
      //     await bcrypt.compareSync(
      //       user.dataValues.password,
      //       updatedUser.password
      //     )
      //   );
      //   console.log(updatedUser.password);
      // },
    },
  }
);

/////// FIRST WE ALWAYS AUTHENTICATE
User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  console.log(await bcrypt.compare(password, user.password));
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('invalid credentials');
  error.status = 401;
  throw error;
};

//////// AFTER AUTHENTICATE WE FIND AND VALIDATE TOKEN
// need an id, and the token to verify
User.findByToken = async token => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  } catch (error) {
    const err = new Error('invalid credentials');
    error.status = 401;
    throw err;
  }
};

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  await cart.save();
  return cart;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id,
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  return cart;
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find(lineItem => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
  const cart = await this.getCart();
  console.log('this is cart', cart);
  console.log('this is product', product);
  const lineItem = cart.lineItems.find(lineItem => {
    return lineItem.productId === product;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

// User.addHook('beforeSave', async user => {
//   if (user.changed('password')) {
//     user.password = await bcrypt.hash(user.password, 5);
//   }
// });

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

module.exports = User;
