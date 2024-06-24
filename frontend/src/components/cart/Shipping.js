import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { countries } from 'countries-list'
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";


// Function to validate shipping information
export const validateShipping = (shippingInfo, navigate) => {

    if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    ) {
        toast.error('Please fill the shipping information', { position: toast.POSITION.BOTTOM_CENTER })
        navigate('/shipping') // Redirect to shipping page if information is incomplete
    }
}


export default function Shipping() {
    const { shippingInfo = {} } = useSelector(state => state.cartState)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // Handle form submission to save shipping information
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }))
        navigate('/order/confirm')  // Navigate to order confirmation page
    }





    return (
        <Fragment>
            <CheckoutSteps shipping />
            <div className="container pt-3 pb-5 ps-3 pe-3 mt-lg-5 ">
                <div className="row">
                    <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
                        <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded">

                            <h2 className="text-center  fw-bold">Shipping Info</h2>

                            {/* Address Input */}
                            <div className="form-group  mb-3">
                                <label htmlFor="address_field" className="form-label fw-bold ">Address</label>
                                <input
                                    type="text"
                                    id="address_field"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>


                            {/* City Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="city_field" className="form-label fw-bold ">City</label>
                                <input
                                    type="text"
                                    id="city_field"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Phone Number Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="phone_field" className="form-label fw-bold ">Phone No</label>
                                <input
                                    type="phone"
                                    id="phone_field"
                                    className="form-control"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required
                                />
                            </div>


                            {/* Postal Code Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="postal_code_field" className="form-label fw-bold ">Postal Code</label>
                                <input
                                    type="number"
                                    id="postal_code_field"
                                    className="form-control"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Country Dropdown */}
                            <div className="form-group mb-3">
                                <label htmlFor="country_field" className="form-label fw-bold ">Country</label>
                                <select
                                    id="country_field"
                                    className="form-control"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required

                                >{countryList.map((country, i) => (

                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))
                                    }
                                </select>
                            </div>


                            {/* State Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="state_field" className="form-label fw-bold ">State</label>
                                <input
                                    type="text"
                                    id="state_field"
                                    className="form-control"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Submit button */}
                            <div className="mb-3 d-flex justify-content-center">
                                <button
                                    id="shipping_btn"
                                    type="submit"
                                    className="btn bg-warning w-25 mt-3 fw-bold text-black"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}