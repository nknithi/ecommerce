import { createSlice } from "@reduxjs/toolkit";


// Creating a cart slice using Redux Toolkit's createSlice
const cartSlice = createSlice({
    name: 'cart', // Name of the slice
    initialState: {
        items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): {}
    },
    reducers: {

                // Action to handle request for adding an item to the cart
        addCartItemRequest(state, action){
            return {
                ...state,
                loading: true // Set loading to true
            }
        },

                // Action to handle successful addition of an item to the cart
        addCartItemSuccess(state, action){
            const item = action.payload

                        // Check if the item already exists in the cart
            const isItemExist = state.items.find( i => i.product == item.product);
            
            if(isItemExist) {
                state = {
                    ...state,
                    loading: false, // Set loading to false
                } 
            }else{
                state = {
                    items: [...state.items, item], // Add new item to the cart
                    loading: false // Set loading to false
                }
                
                                // Save updated cart items to localStorage
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
            return state
            
        },

                // Action to increase the quantity of a cart item
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product == action.payload) {
                    item.quantity = item.quantity + 1 // Increase quantity by 1
                }
                return item;
            })

                        // Save updated cart items to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        },

                // Action to decrease the quantity of a cart item
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product == action.payload) {
                    item.quantity = item.quantity - 1  // Decrease quantity by 1
                }
                return item;
            })

                        // Save updated cart items to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        },

                // Action to remove an item from the cart
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload // Remove item from cart
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            return {
                ...state,
                items: filterItems // Update cart items in state
            }
        },

                // Action to save shipping information
        saveShippingInfo(state, action) {

                        // Save shipping info to localStorage
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload // Update shipping info in state
            }
        },

                // Action to clear cart and shipping info after order completion
        orderCompleted(state, action) {

                        // Remove shipping info and cart items from localStorage
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');

                        // Remove order info from sessionStorage
            sessionStorage.removeItem('orderInfo');
            return {
                items: [], // Clear cart items
                loading: false, // Set loading to false
                shippingInfo: {} // Clear shipping info
            }
        }

    }
});

// Destructure actions and reducer from cartSlice
const { actions, reducer } = cartSlice;

// Export actions for use in components and action creators
export const { 
    addCartItemRequest, 
    addCartItemSuccess,
    decreaseCartItemQty,
    increaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted
 } = actions;


 // Export the reducer to be used in the store
export default reducer;

