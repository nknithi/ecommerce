import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';

export default function Cart() {
    const { items } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // Function to increase quantity of a cart item
    const increaseQty = (item) => {
        const count = item.quantity;

        // Check if item is out of stock or quantity exceeds stock
        if (item.stock == 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product))
    }

    // Function to decrease quantity of a cart item
    const decreaseQty = (item) => {
        const count = item.quantity;

        // Check if quantity is already at minimum (1)
        if (count == 1) return;
        dispatch(decreaseCartItemQty(item.product))
    }

    // Function to handle checkout process
    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }


    return (
        <Fragment>
            {items.length == 0 ?
                <h2 className="mt-5">Your Cart is Empty</h2> :
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                            {/* Mapping through cart items to display each item */}
                            {items.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="50" width="115" className='img-fluid' />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">

                                                {/* Quantity control with plus and minus buttons */}
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">

                                                {/* Delete item button */}
                                                <i id="delete_cart_item" onClick={() => dispatch(removeItemFromCart(item.product))} className="fa fa-trash btn btn-danger"></i>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            )
                            )
                            }


                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">

                            {/* Order summary section */}
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />

                                {/* Calculating subtotal and estimated total */}
                                <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item) => (acc + item.quantity), 0)} (Items)</span></p>
                                <p>Est. total: <span className="order-summary-values">${items.reduce((acc, item) => (acc + item.quantity * item.price), 0)}</span></p>

                                <hr />
                                {/* Submit button */}
                                <div className="mb-3 d-flex justify-content-center">

                                    <button id="checkout_btn" onClick={checkoutHandler} className="btn bg-warning mt-3 fw-bold text-black" >Check out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }

        </Fragment>
    )
}