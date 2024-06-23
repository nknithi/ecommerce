const catchAsyncError = require('../middlewares/catchAsyncError'); // Middleware to catch and handle asynchronous errors
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) // Initialize Stripe with the secret key from environment variables


// Controller to handle the payment processing
exports.processPayment  = catchAsyncError(async(req, res, next) => {

        // Create a payment intent with the details from the request body
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount, // Amount to be charged
        currency: "usd",  // Currency of the payment
        description: "TEST PAYMENT", // Description of the payment
        metadata: { integration_check: "accept_payment"}, // Metadata for the payment
        shipping: req.body.shipping   // Shipping details from the request body
    })

        // Respond with the client secret to complete the payment on the client side
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})


// Controller to send the Stripe public API key to the client
exports.sendStripeApi  = catchAsyncError(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

