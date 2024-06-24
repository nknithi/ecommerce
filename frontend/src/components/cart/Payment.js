import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from '../cart/Shipping';
import { createOrder } from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error: orderError } = useSelector(state => state.orderState)


    // Payment data object to be sent to the server
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    }


    // Order object to be created
    const order = {
        orderItems: cartItems,
        shippingInfo
    }


    // Assign order price details if available
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice

    }

    // Validate shipping information on component mount
    useEffect(() => {
        validateShipping(shippingInfo, navigate)
        if (orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearOrderError()) }
            })
            return
        }

    }, [])


    // Handle submission of payment form
    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const { data } = await axios.post('/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {

                // Display error toast if payment confirmation fails
                toast(result.error.message, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER
                })
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if ((await result).paymentIntent.status === 'succeeded') {

                    // Display success toast and update order details if payment succeeds
                    toast('Payment Success!', {
                        type: 'success',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(orderCompleted()) // Dispatch action to mark order as completed in Redux
                    dispatch(createOrder(order))  // Dispatch action to create order in Redux store

                    navigate('/order/success') // Navigate to order success page
                } else {

                    // Display warning toast if payment status is not succeeded
                    toast('Please Try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                }
            }


        } catch (error) {

        }
    }


    return (
        <div className="container pt-3 pb-5 ps-3 pe-3 mt-lg-5 ">
            <div className="row">
                <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
                    <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded">
                        <h3 className="text-center">Card Info </h3>

                        {/* Card Number Element */}
                        <div className="form-group  mb-3">
                            <label htmlFor="card_num_field" className="form-label fw-bold ">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"

                            />
                        </div>

                        {/* Card Expiry Element */}
                        <div className="form-group  mb-3">
                            <label htmlFor="card_exp_field" className="form-label fw-bold ">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"

                            />
                        </div>

                        {/* Card CVC Element */}
                        <div className="form-group mb-3">
                            <label htmlFor="card_cvc_field" className="form-label fw-bold ">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                value=""
                            />
                        </div>

                        {/* Submit button */}
                        <div className="mb-3 d-flex justify-content-center">
                            <button
                                id="pay_btn"
                                type="submit"
                                className="btn bg-danger  align-center w-25 w-bold  mb-2 p-2 mt-3 text-light"                     >
                                Pay - {` $${orderInfo && orderInfo.totalPrice}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}