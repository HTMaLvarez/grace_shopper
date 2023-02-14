const app = require('./app');
const { syncAndSeed } = require('./db');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

app.post('/create-checkout-session', async (req, res) => {
  try {
    // req.body.items - create stripe format
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach(item => {
      lineItems.push({
        price: item.id,
        quantity: item.quantity,
      });
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
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

// const storeItems = new Map([
//   [1, { priceInCents: 5000, name: 'Video Game 1' }],
//   [2, { priceInCents: 5000, name: 'Video Game 2' }],
//   [3, { priceInCents: 5000, name: 'Video Game 3' }],
// ]);

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: req.body.items.map(item => {
//         const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCents,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.SERVER_URL}/success`,
//       cancel_url: `${process.env.SERVER_URL}/cancel`,
//     });
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });
