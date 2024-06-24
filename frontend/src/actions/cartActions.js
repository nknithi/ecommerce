import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice'; // Importing action creators from Redux slice
import axios from 'axios'  // Importing Axios for making HTTP requests

// Action creator to add an item to the cart
export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest())  // Dispatching action to set loading state

        // Making a GET request to fetch product details by ID
        const { data } = await axios.get(`/api/v1/product/${id}`)

        // Dispatching action to add item to the cart with fetched product details
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
        // Handling any errors that occur during the request
    } catch (error) {

    }
}