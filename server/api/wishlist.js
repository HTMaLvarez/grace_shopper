const express = require('express');
const app = express.Router();
const { Wish, User } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const wishlist = await Wish.findAll({
      where: { userId: user.id },
    });

    res.json(wishlist);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const wish = await Wish.create(req.body);
    res.json(wish);
  } catch (ex) {
    next(ex);
  }
});
