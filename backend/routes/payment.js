const express = require('express');
const { processPayment, sendStripeApi } = require('../controllers/paymentController'); // Import payment controller functions
const { isAuthenticatedUser } = require('../middlewares/authenticate'); // Import authentication middleware
const router = express.Router(); // Create a new Express router

// Route to process payment (accessible to authenticated users)
router.route('/payment/process').post( isAuthenticatedUser, processPayment);

// Route to fetch Stripe API key (accessible to authenticated users)
router.route('/stripeapi').get( isAuthenticatedUser, sendStripeApi);

// Export the router to be used in other parts of the application
module.exports = router;