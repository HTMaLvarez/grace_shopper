const express = require("express");
const app = express.Router();
const { User } = require("../db");
const Order = require("../db/Order");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.update(req.body);

    res.send(await user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});
