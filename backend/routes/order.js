const express = require('express');
const {
    newOrder, // Controller function to create a new order
    getSingleOrder, // Controller function to fetch a single order by ID
    myOrders,    // Controller function to fetch orders of the authenticated user
    orders,  // Controller function to fetch all orders (admin only)
    updateOrder,    // Controller function to update an order by ID (admin only)
    deleteOrder  // Controller function to delete an order by ID (admin only)
} = require('../controllers/orderController'); // Import order controller functions
const router = express.Router();  // Create a new Express router
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

// Route to create a new order (accessible to authenticated users)
router.route('/order/new').post(isAuthenticatedUser, newOrder);

// Route to fetch a single order by ID (accessible to authenticated users)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

// Route to fetch orders of the authenticated user
router.route('/myorders').get(isAuthenticatedUser, myOrders);

// Admin Routes
// Route to fetch all orders (accessible to admin users)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders)

// Route to update an order by ID (admin only)
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

// Export the router to be used in other parts of the application
module.exports = router;