const router = require('express').Router();
const { User, Product, ProductReview } = require('../db');
const { reporters } = require('mocha');

router.get('/', async (req, res, next) => {
  try {
    const allReviews = await ProductReview.findAll();
    res.send(allReviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
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

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const reviewsForThisProduct = await ProductReview.findAll({
//       where: { userId: req.params.userId },
//       include: [Product],
//     });
//     res.send(reviewsForThisProduct);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

module.exports = router;
