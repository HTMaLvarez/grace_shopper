const router = require('express').Router();
const { ProductReview, User, Product } = require('../db');
const { reporters } = require('mocha');

//not used yet
router.get('/', async (req, res, next) => {
  try {
    const allReviews = await ProductReview.findAll();
    res.send(allReviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const reviews = await ProductReview.findByPk(req.params.id);
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/product/:productId', async (req, res, next) => {
  try {
    const reviewsForThisProduct = await ProductReview.findAll({
      where: { productId: req.params.productId },
      include: [User],
    });
    res.send(reviewsForThisProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const reviewsForThisProduct = await ProductReview.findAll({
      where: { userId: req.params.userId },
      include: [Product],
    });
    res.send(reviewsForThisProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const reviewToAdd = await ProductReview.create({
      review: req.body.review,
      rating: req.body.rating,
    });

    reviewToAdd.userId = req.body.userId;
    await reviewToAdd.save();
    reviewToAdd.productId = req.body.productId;
    await reviewToAdd.save();

    res.send(reviewToAdd);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
