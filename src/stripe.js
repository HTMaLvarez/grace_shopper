// export const checkout = async () => {
//   await fetch('/create-checkout-session', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ items: cart.lineItems }),
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(response => {
//       if (response.url) {
//         window.location.assign(response.url);
//       }
//     });
// };

// module.exports = checkout;
