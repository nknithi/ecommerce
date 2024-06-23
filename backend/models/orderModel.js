const mongoose = require('mongoose');


// Define the order schema with various fields and their constraints
const orderSchema = mongoose.Schema({
    shippingInfo: {  // Shipping information for the order
        address: {
            type: String,
            required: true // Address is required
        },
        country: {
            type: String,
            required: true  // Country is required
        },
        city: {
            type: String,
            required: true // City is required
        },
        phoneNo: {
            type: String,
            required: true  // Phone number is required
        },
        postalCode: {
            type: String,
            required: true  // Postal code is required
        }
    },
    user: { // Reference to the user who placed the order
        type: mongoose.SchemaTypes.ObjectId,
        required: true, // User ID is required
        ref: 'User' // Reference to the User model
    },
    orderItems: [{ // Array of items in the order
        name: {
            type: String,
            required: true // Item name is required
        },
        quantity: {
            type: Number,
            required: true // Item quantity is required
        },
        image: {
            type: String,
            required: true // Item image URL is required
        },
        price: {
            type: Number,
            required: true  // Item price is required
        },
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true, // Product ID is required
            ref: 'Product' // Reference to the Product model
        }

    }],
    itemsPrice: {
        type: Number,
        required: true,  // Total price of items is required
        default: 0.0 // Default value is 0.0
    },
    taxPrice: {
        type: Number,
        required: true, // Tax price is required
        default: 0.0 // Default value is 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,  // Shipping price is required
        default: 0.0 // Default value is 0.0
    },
    totalPrice: {
        type: Number,
        required: true, // Total price of the order is required
        default: 0.0 // Default value is 0.0
    },
    paymentInfo: { // Payment information for the order
        id: {
            type: String, 
            required: true // Payment ID is required
        },
        status: {
            type: String,
            required: true // Payment status is required
        }
    },
    paidAt: {
        type: Date  // Date when the order was paid
    },
    deliveredAt: {
        type: Date // Date when the order was delivered
    }, 
    orderStatus: {  // Status of the order
        type: String,
        required: true,  // Order status is required
        default: 'Processing' // Default value is 'Processing'
    },
    createdAt: {
        type: Date, 
        default: Date.now // Default value is the current date and time
    }
})

// Create the Order model using the order schema
let orderModel = mongoose.model('Order', orderSchema);

// Export the Order model to be used in other parts of the application
module.exports = orderModel;