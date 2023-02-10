const express = require('express');
const app = express.Router();
const { User } = require('../db');

app.post('/', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

app.get('/', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
