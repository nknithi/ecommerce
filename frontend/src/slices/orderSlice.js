import { createSlice } from "@reduxjs/toolkit";


// Creating an order slice using Redux Toolkit's createSlice
const orderSlice = createSlice({
    name: 'order', // Name of the slice
    initialState: {
        orderDetail: {}, // Detail of a single order
        userOrders : [],  // Orders placed by the user
        adminOrders: [], // Orders accessible by admin
        loading: false, // Initial loading state
        isOrderDeleted: false, // Flag to check if an order is deleted
        isOrderUpdated: false // Flag to check if an order is updated
    },
    reducers: {

                // Action to handle request for creating an order
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true // Set loading to true
            }
        },

                // Action to handle successful creation of an order
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,  // Set loading to false
                orderDetail: action.payload.order // Update order detail
            }
        },

                // Action to handle failure in creating an order
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false, // Set loading to false
                error: action.payload // Update error state
            }
        },

                // Action to clear any errors in the state
        clearError(state, action) {
            return {
                ...state,
                error: null // Clear error state
            }
        },

                // Action to handle request for fetching user orders
        userOrdersRequest(state, action) {
            return {
                ...state,
                loading: true // Set loading to true
            }
        },

                // Action to handle successful fetching of user orders
        userOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false, // Set loading to false
                userOrders: action.payload.orders  // Update user orders
            }
        },

                // Action to handle failure in fetching user orders
        userOrdersFail(state, action) {
            return {
                ...state,
                loading: false,  // Set loading to false
                error: action.payload // Update error state
            }
        },

                // Action to handle request for fetching order details
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true // Set loading to true
            }
        },

                // Action to handle successful fetching of order details
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,  // Set loading to false
                orderDetail: action.payload.order // Update order detail
            }
        },

                // Action to handle failure in fetching order details
        orderDetailFail(state, action) {
            return {
                ...state,
                loading: false,  // Set loading to false
                error: action.payload // Update error state
            }
        },

                // Action to handle request for fetching admin orders
        adminOrdersRequest(state, action) {
            return {
                ...state,
                loading: true  // Set loading to true
            }
        },

                // Action to handle successful fetching of admin orders
        adminOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false, // Set loading to false
                adminOrders: action.payload.orders // Update admin orders
            }
        },

         // Action to handle failure in fetching admin orders
                 adminOrdersFail(state, action) {
            return {
                ...state,
                loading: false, // Set loading to false
                error: action.payload // Update error state
            }
        },

                // Action to handle request for deleting an order
        deleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true  // Set loading to true
            }
        },

                // Action to handle successful deletion of an order
        deleteOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,  // Set loading to false
                isOrderDeleted: true // Set order deleted flag to true
            }
        },

                // Action to handle failure in deleting an order
        deleteOrderFail(state, action) {
            return {
                ...state, 
                loading: false, // Set loading to false 
                error: action.payload // Update error state
            }
        },

                // Action to handle request for updating an order
        updateOrderRequest(state, action) {
            return {
                ...state,
                loading: true // Set loading to true
            }
        },

                // Action to handle successful update of an order
        updateOrderSuccess(state, action) {
            return {
                ...state,
                loading: false, // Set loading to false
                isOrderUpdated: true // Set order updated flag to true
            }
        },

                // Action to handle failure in updating an order
        updateOrderFail(state, action) {
            return {
                ...state,
                loading: false, // Set loading to false
                error: action.payload // Update error state
            }
        },

                // Action to clear the order deleted flag
        clearOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false // Clear order deleted flag
            }
        },

                // Action to clear the order updated flag
        clearOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdated: false  // Clear order updated flag
            }
        }

    }
});

// Destructure actions and reducer from orderSlice
const { actions, reducer } = orderSlice;

// Export actions for use in components and action creators
export const { 
    createOrderFail,
    createOrderSuccess,
    createOrderRequest,
    clearError,
    userOrdersFail,
    userOrdersSuccess,
    userOrdersRequest,
    orderDetailFail,
    orderDetailSuccess,
    orderDetailRequest,
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    clearOrderDeleted,
    clearOrderUpdated
 } = actions;

 // Export the reducer to be used in the store
 export default reducer;

