import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice'

// Combine all reducers into a single root reducer
const reducer = combineReducers({
    productsState: productsReducer, // Handles state related to products
    productState: productReducer, // Manages state for a single product
    authState: authReducer,  // Manages authentication state
    cartState: cartReducer, // Handles shopping cart state
    orderState: orderReducer,  // Manages state related to orders
    userState: userReducer   // Manages user profile and account state
})

// Configure the Redux store with combined reducers and middleware
const store = configureStore({
    reducer, // Combined reducer containing all slices
    middleware: [thunk] // Middleware for handling async actions with Redux Thunk
})

export default store;