// Import necessary modules
const stripe = require('stripe')('your_stripe_secret_key');

// Function to handle payment processing using the Stripe API
function processPayment(amount, cardDetails) {
    return stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method: cardDetails,
        confirm: true
    });
}

// Export function for external use
module.exports = {
    processPayment
};
