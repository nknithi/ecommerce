import {
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    createOrderFail,
    createOrderRequest,
    createOrderSuccess,
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    orderDetailFail,
    orderDetailRequest,
    orderDetailSuccess,
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    userOrdersFail,
    userOrdersRequest,
    userOrdersSuccess
} from '../slices/orderSlice'; // Importing action creators from orderSlice Redux slice

import axios from 'axios'; // Importing Axios for making HTTP requests

// Action creator to create a new order
export const createOrder = order => async (dispatch) => {
    try {
        dispatch(createOrderRequest())  // Dispatching action to set loading state

        // Making a POST request to create a new order
        const { data } = await axios.post(`/api/v1/order/new`, order)

        // Dispatching action to handle successful order creation
        dispatch(createOrderSuccess(data))
    } catch (error) {

        // Dispatching action to handle order creation failure
        dispatch(createOrderFail(error.response.data.message))
    }
}

// Action creator to fetch orders of the authenticated user
export const userOrders = async (dispatch) => {
    try {
        dispatch(userOrdersRequest()) // Dispatching action to set loading state

        // Making a GET request to fetch orders of the authenticated user
        const { data } = await axios.get(`/api/v1/myorders`)

        // Dispatching action to handle successful fetch of user orders
        dispatch(userOrdersSuccess(data))
    } catch (error) {

        // Dispatching action to handle failure in fetching user orders
        dispatch(userOrdersFail(error.response.data.message))
    }
}

// Action creator to fetch details of a single order by ID
export const orderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest())  // Dispatching action to set loading state

        // Making a GET request to fetch order details by ID
        const { data } = await axios.get(`/api/v1/order/${id}`)

        // Dispatching action to handle successful fetch of order details
        dispatch(orderDetailSuccess(data))
    } catch (error) {

        // Dispatching action to handle failure in fetching order details
        dispatch(orderDetailFail(error.response.data.message))
    }
}

// Action creator to fetch all orders (admin-only)
export const adminOrders = async (dispatch) => {
    try {
        dispatch(adminOrdersRequest())  // Dispatching action to set loading state

        // Making a GET request to fetch all orders (admin-only)
        const { data } = await axios.get(`/api/v1/admin/orders`)

        // Dispatching action to handle successful fetch of admin orders
        dispatch(adminOrdersSuccess(data))
    } catch (error) {

        // Dispatching action to handle failure in fetching admin orders
        dispatch(adminOrdersFail(error.response.data.message))
    }
}


// Action creator to delete an order by ID (admin-only)
export const deleteOrder = id => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest()) // Dispatching action to set loading state

        // Making a DELETE request to delete an order by ID (admin-only)
        await axios.delete(`/api/v1/admin/order/${id}`)

        // Dispatching action to handle successful deletion of an order
        dispatch(deleteOrderSuccess())
    } catch (error) {

        // Dispatching action to handle failure in deleting an order
        dispatch(deleteOrderFail(error.response.data.message))
    }
}

// Action creator to update an order by ID (admin-only)
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest()) // Dispatching action to set loading state

        // Making a PUT request to update an order by ID (admin-only)
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData)

        // Dispatching action to handle successful update of an order
        dispatch(updateOrderSuccess(data))
    } catch (error) {

        // Dispatching action to handle failure in updating an order
        dispatch(updateOrderFail(error.response.data.message))
    }
}