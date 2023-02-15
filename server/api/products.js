const express = require('express');
const app = express.Router();
const { Product, ProductReview } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [ProductReview],
    });
    res.send(product);
  } catch (ex) {
    next(ex);
  }
});
