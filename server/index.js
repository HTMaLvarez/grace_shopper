const app = require('./app');
const { syncAndSeed } = require('./db');
require('dotenv').config();
const cors = require('cors');

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    // req.body.items - create stripe format with cart items
    // iterate through our items and push them into lineItems
    const items = req.body.items;
    let lineItems = [];
    items.forEach(item => {
      lineItems.push({
        // our id is the 'productId'
        price: item.productId,
        quantity: item.quantity,
      });
    });
    // create the checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      // success_url: `${process.env.SERVER_URL}/success`,
      // cancel_url: `${process.env.SERVER_URL}/cancel`,
    });
    res.send(
      JSON.stringify({
        url: session.url,
      })
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
